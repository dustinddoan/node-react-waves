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


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
})