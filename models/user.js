const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  username : {
    type : String,
    required : true
  },
  name : {
    type : String,
    required : true
  },
  bio : String,
  photo: String,
  phoneNumber: String,
  website: String,
  gender: String,
  following : [
    {
      name : String,
      username : String,
      photo : String
    }
  ],
  followers : [
    {
      name : String,
      username : String,
      photo : String
    }
  ]
});

userSchema.methods.follow_user = function(data) {
  this.following.push(data);
  return this.save();
};

userSchema.methods.add_follower = function(follower) {
  this.followers.push(follower);
  return this.save();
}



module.exports = mongoose.model('User', userSchema);
