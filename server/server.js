const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB and Node.js
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

// use middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())

// Models
const { User } = require('./models/User')

// =========================
//        USERS
// =========================
app.post('/api/users/register', (req, res) => {
  const user  = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({success: false, err});

    res.status(200).json({
      success: true,
      user: doc
    })
  })
})

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


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
})