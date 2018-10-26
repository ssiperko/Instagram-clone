const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const cors = require('cors');
const photoUploader = require('./middleware/photoUploader');
const multer = require('multer');
const path = require('path');

const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');

cloudinary.config({
    cloud_name: 'cloudinary info here',
    api_key: 'cloudinary info here',
    api_secret: 'cloudinary info here'
});

//mongoose.connect("mongodb://localhost:27017/dream", { useNewUrlParser: true });
mongoose.connect( "mongo atlas info here", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(cors());
//the extended property allows us to parse extended bodies with rich data in them.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods' , 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
})

app.use('/accounts', userRoutes);
app.use('/post', postRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// catches any request that does not match an above path and sends it back to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//if any error is thrown anywhere else in the app then it will be logged out with this.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});


module.exports = app;
