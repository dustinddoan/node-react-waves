const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');

const app = express();
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB and Node.js
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// use middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// Models
const { User } = require('./models/User')
const { Brand } = require('./models/Brand')
const { Wood } = require('./models/Wood')
const { Product } = require('./models/Product')
const { Payment } = require('./models/Payment')

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// =========================
//        PRODUCT
// =========================

app.post('/api/product/shop', (req, res) => {
  let order = req.body.order ? req.body.order : "desc"
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id"
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for(let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key == 'price') {
              findArgs[key] ={
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              }
          } else {
              findArgs[key] = req.body.filters[key]
          }
      }
  }

  console.log(findArgs)
  Product
    .find(findArgs)
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if(err) return res.status(400).send(err);

      res.status(200).json({
        size: articles.length,
        articles
      })
    })
})

// add new product
app.post('/api/product/article', auth, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err)  return res.json({success: false, err})

    res.status(200).json({
      success: true,
      article:doc
    })
  })
})

// get products by id
//  /api/product/article?id=hfjgfsdk32fd,snd3h24jdfd&type=single
app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(',');
    
    items = []
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    })
  }

  Product
    .find({'_id': {$in: items}})
    .populate('brand')
    .populate('wood')
    .exec((err, docs) => {
      return res.status(200).send(docs)
    })
    
})


// get products by arraival
// /api/product/articles?sortBy=createdAt&order=desc&limit=4
// get products by sell
// /api/product/articles?sortBy=sold&order=desc&limit=4
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 100

  Product
      .find()
      .populate('brand')
      .populate('wood')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, articles) => {
          if (err) return res.status(400).send(err)

          res.send(articles)
      })
})


// =========================
//        WOOD
// =========================

// add new wood
app.post('/api/product/wood', auth, (req, res) => {
  const wood =  new Wood(req.body);

  wood.save((err, doc) => {
    if (err)  return res.json({success: false, err})

    res.status(200).json({
      success: true,
      wood: doc
    })
  })
})


// get woods
app.get('/api/product/woods', (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err)  return res.json({success: false, err});

    res.status(200).send(woods)
  })
})

// =========================
//        BRAND
// =========================

// add new brand
app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err)  return res.json({success: false, err});

    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

// get brands
app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(brands)
  })
})

// =========================
//        USERS
// =========================

// auth
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true, 
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history

  })
})

// logout
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id},
    { token: ''},
    (err, doc) => {
      if (err) return res.json({ success: false, err })

      return res.status(200).send({ success: true })
    }
  )
})

// register
app.post('/api/users/register', (req, res) => {
  const user  = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({success: false, err});

    res.status(200).json({
      success: true,
      // user: doc
    })
  })
})

//login
app.post('/api/users/login', (req, res) => {
  User.findOne({'email': req.body.email}, (err, user) => {
    if (!user) return res.json({loginSuccess: false, message: 'Auth failed, email not found'});

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json ({loginSuccess: false, message: 'Wrong password'});

      user.generateToken((err, token) => {
        if (err) return res.status(400).send(err);

        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true
        })
        console.log('token:', user.token)
      })
    })
  })
})

// upload image to cloudinary
app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    console.log(result)
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    })
  }, {
    public_id: `${Date.now()}taro03`,
    resouce_type: 'auto'
  })
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if(err) return res.json({success: false, err})

    res.status(200).send('ok')
  })
})

app.post('/api/users/addToCart', auth, (req, res) => {
  User.findOne({_id: req.user._id}, (err, user) => {
    let duplicate = false
    // console.log('user cart:', user.cart)
    user.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true
      }
    })

    if (duplicate) {
      User.findOneAndUpdate(
        {_id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId)},
        { $inc: {'cart.$.quantity': 1}},
        {new: true},
        () => {
          if (err)  return res.json({success: false, err})
          res.status(200).json(user.cart)
        }
      )
    } else {
      User.findOneAndUpdate(
        {_id: req.user._id},
        { $push: { cart: {
          id: mongoose.Types.ObjectId(req.query.productId),
          quantity: 1,
          date: Date.now()
        }}},
        {new: true},
        (err, user) => {
          if (err)  return res.json({success: false, err})
          res.status(200).json(user.cart)
        }
      )
    }

  })
})

app.get('/api/users/removeFromCart', auth, (req, res) => {

  User.findOneAndUpdate(
    {_id: req.user._id},
    {"$pull": 
      {"cart": {"id": mongoose.Types.ObjectId(req.query._id)}}
    },
    { new: true},
    (er, user) => {
      let cart = user.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id)
      })

      Product
        .find({'_id': {$in: array}})
        .populate('brand')
        .populate('wood')
        .exec((err, cartDetail) => {
          return res.status(200).json({cartDetail, cart})
        })
    }
  )
})

app.post('/api/users/successBuy', auth, (req, res) => {
  let history = []
  let transactionData = {}
  // console.log('server:', req.body.cartDetail)
  // console.log('server:',req.body.paymentData)

  // user history
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    })
  })

  // payment dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  }
  transactionData.data = req.body.paymentData;
  transactionData.product = history

  // console.log('history:', history)
  // console.log('transactionData:', transactionData)
  // console.log('user:', req.user)  

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history}, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if(err) return res.json({success: false, err})

      const payment = new Payment(transactionData);

      payment.save((err, doc) => {
        // console.log('doc:', doc)
        // console.log('payment:', payment)
        if(err) return res.json({success: false, err});

        let products = [];
        doc.product.forEach(item => {
          products.push({id: item.id, quantity: item.quantity})
        })

        // console.log('products:', products)

        async.eachSeries(products, (item, callback) => {
          // console.log(products)
          // console.log(item)
          Product.update(
            { _id: item.id},
            { $inc: { "sold": item.quantity } },
            { new: false },
            callback 
          )
        }, (err) => {
          if(err) return res.json({success: false, err})

          res.status(200).json({
            success: true,
            cart: user.cart,
            cartDetail: []
          })
        })
      })
    }
  )

})

// =========================
//        SERVER
// =========================
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
})