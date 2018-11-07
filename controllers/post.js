const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch');
const Post = require('../models/posts');


//post a photo to your profile
exports.new_post = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    username : req.body.username,
    photo:req.body.photo,
    caption:req.body.caption
  });
  console.log(post);
  post.save()
  .then((user) => {
    console.log(post);
    res.status(201).json({
      message: 'post created'
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

exports.cloudinary_upload_post = (req, res, next) => {
  cloudinary.uploader.upload_stream((result) => {
    console.log(result, "N02");
    if (result){
      console.log(result, "N03");
      let cloudinaryUrl = result.secure_url.split('/');
      cloudinaryUrl.splice(6,0,'c_crop,g_center,h_3000,w_3000');
      let newUrl = cloudinaryUrl.join("/");
      let token = req.body.token;
      let data = {
        photo : newUrl,
        caption : req.body.caption,
        username : req.body.username
      };
      const URL = req.body.url;
      const init = {
        body: JSON.stringify(data),
        method : req.body.type,
        headers: {
            'content-type': 'application/json',
            'authorization' : 'bearer ' + token
          }
      };
      fetch(URL, init)
        .then((res)=>{
            return res.json()})
        .then((res)=> {
            console.log('updated');
            alert("done");
      }).catch((err) =>{
        res.send(err);
      });
  }
  }).end(req.file.buffer);
};

exports.explore = () => {
  Post.aggregate(
    [
      { "$match": {}},
      { "$group" : {
        "date": { "$first": "$date" }
      }},
      { "$sort" : {"date" : -1}}
    ]
  )
  .then((result)=>{
    console.log('explore');
    console.log(result);
    res.status(200).json({
      message: 'gotten',
      items: result
    })
  })
 };

exports.comment = (req, res, next) => {
  Post.findById(req.body.post_id)
  .exec()
  .then((post)=> {
    return post.comment({
      author: {
        author_id: req.body.author_id,
        author_name: req.body.author_name,
        author_username: req.body.author_username
      },
      text: req.body.text
    })
    .then((result) => {
      res.status(201).json({
        message: "commented on post this is a comment"
      })
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

exports.like = (req, res, next) => {
  Post.findById(req.body.post_id)
  .exec()
  .then((post)=> {
    const exists = post.likes.some((like) => {return like.liked_by === req.body.username});
    /*const names = [];
    post.likes.map((like)=>{
      names.push(like.liked_by);
    })*/
    if(/*names.includes(req.body.username*/ exists){
      return res.status(500).json({
        message: 'already liked'
      })
    } else {
        return post.like({
          liked_by: req.body.username,
          photo: req.body.photo,
          name: req.body.name
        })
      }
    })
  .then((result)=>{
    res.status(201).json({
      message: req.body.username + " Liked your post"
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};

// update an existing post on your profile
exports.update_post = (req, res, next) => {

};

//see all recent posts
exports.explore = (req, res, next) => {
  Post.find()
  .exec()
  .then((post) => {
    console.log(post);
    res.status(200).json(post)
  })
  .catch((err) => {
    res.status(500).json({
      error : err
    })
  })
};

//get all of your posts
exports.get_user_feed = (req, res, next) => {
  Post.find({'username' : req.params.username})
  .exec()
  .then((feed) => {
    res.status(200).json(feed);
  })
  .catch((err) => {
    res.status(500).json({
      error : err
    });
  });
};

//delete a post from your profile
exports.drop_post = (req, res, next) => {
  Post.remove({"_id" : req.params.id})
  .exec()
  .then((result) => {
    res.status(200).json({
      message : 'Post removed'
    })
  })
  .catch((err) => {
    res.status(500).json((err)=>{
      error : err
  })
});
};
