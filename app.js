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
    cloud_name: 'dzwiiqcr2',
    api_key: '583127865533449',
    api_secret: 'NRic0s_NMxT9Yhf_gP9ROcawVUk'
});

//mongoose.connect("mongodb://localhost:27017/dream", { useNewUrlParser: true });
mongoose.connect( "mongodb://luke-test:RqilqIhxcNitQkG9@cluster0-shard-00-00-yftga.mongodb.net:27017,cluster0-shard-00-01-yftga.mongodb.net:27017,cluster0-shard-00-02-yftga.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });
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
