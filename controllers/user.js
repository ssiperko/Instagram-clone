const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const fetch = require('node-fetch');

exports.create_account = (req, res, next) => {
  User.find({"email" : req.body.email})
  .exec()
  .then(user => {
      console.log(user);
      if(user.length >= 1){
        return res.status(409).json({
          message : 'email already exists'
        })
      }else{
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
              return res.status(500).json({
                error : err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                name : req.body.name,
                username : req.body.username,
                bio : req.body.bio
              });
              user.save()
              .then((user) => {
                console.log(user);
                res.status(201).json({
                  message: 'user created'
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              })
            }
        });
      }
  });
};

exports.login_user = (req, res, next) => {
    User.find({"email" : req.body.email})
    .exec()
    .then((user) => {
      if(user.length < 1) {
        return res.status(401).json({
          message : "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
        if(err) {
          return res.status(401).json({
            message : "Auth failed",
            error : err
          });
        }
        if(result){
          console.log(result);
          const token = jwt.sign(
            {
              email : user[0].email,
              userId : user[0]._id
            },
            env.JWT_KEY,
            {
              expiresIn: "1h"
            }
         );

          return res.status(200).json({
            message: 'Auth successful',
            token : token,
            username : user[0].username,
            id : user[0]._id,
            userPhoto: user[0].photo,
            name: user[0].name
          });
        }
        return res.status(401).json({
          message : "Auth failed"
        });
      })
    })
    .catch((err) => {
      res.status(500).json((err)=>{
        error : err
    })
  })
};

// only give a general message when auth fails in order to prevent opening the door to a brute force attack
/*
user_data : user.map((data) => {
  return {
    username : data.username,
    id : data._id
  }
})
*/

exports.update_user = (req, res, next) => {
  console.log(req.params)
  const id = req.params.id;
  User.update({_id:id}, req.body)
  .exec()
  .then(result => {
  console.log(result);
  res.status(201).json({
    message: 'Document ' + id + ' updated',
    requests: {
      message: 'View updated item by sending a get request to the following url',
      type: 'GET',
      url: 'http://localhost:8000/update/' + id
    }
  });
  })
  .catch(err => {
  console.log(err);
   res.status(500).json({
    error : err
  })
  });
};

exports.drop_user = (req, res, next) => {
  User.remove({"_id" : req.params.id})
  .exec()
  .then((result) => {
    res.status(200).json({
      message : 'deleted'
    })
  })
  .catch((err) => {
    res.status(500).json((err)=>{
      error : err
    })
  })
};

exports.get_user = (req, res, next) => {
  User.find({'username' : req.params.username})
  .select('name username bio photo following followers')
  .exec()
  .then((user) => {
    console.log(user);
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({
      error : err
    })
  })
};

/*exports.cloudinary_upload_profile_photo = (req, res, next) => {
  cloudinary.uploader.upload_stream((result) => {
    if (result){
      let userId = req.body.id;
      let token = req.body.token;
      let data = {
        photo : result.secure_url
      };
      console.log(userId, token, data);
      const URL = req.body.url;
      const init = {
        body: JSON.stringify(data),
        method : 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization' : 'bearer ' + token
          }
      };
      fetch(URL, init)
        .then((res)=>{
            return res.json()
        })
        .then((res)=> {
            console.log(res);
      })
      .catch((err) =>{
        res.send(err);
      });
    }
  }).end(req.file.buffer);
};*/

exports.follow_user = (req, res, next) => {
    User.findById(req.body.follower_id)
    .exec()
    .then((user)=> {
      const exists = user.following.some((follow) => {return follow.username === req.body.username});
      if(exists){
        return res.status(500).json({
          message: 'already following'
        })
      } else {
          const data = {
            name : req.body.name,
            username : req.body.username,
            photo : req.body.photo
          };
          return user.follow_user(data);
        }
      })
    .then((result)=>{
      res.status(201).json({
        message:"You started following " + req.body.username
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  };

exports.add_follower = (req, res, next) => {
  User.findById(req.body.follower_id)
  .exec()
  .then((user)=> {
    console.log(user);
    const exists = user.followers.some((follower) => {return follower.username === req.body.username});
    if(exists){
      return res.status(500).json({
        message: 'already following'
      })
    } else {
        const data = {
          name : req.body.name,
          username : req.body.username,
          photo : req.body.photo
        };
        return user.add_follower(data);
      }
    })
  .then((result)=>{
    res.status(201).json({
      message:req.body.username + " started following you"
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
};


/*const names = [];
post.likes.map((like)=>{
  names.push(like.liked_by);
})*/
/*names.includes(req.body.username*/
