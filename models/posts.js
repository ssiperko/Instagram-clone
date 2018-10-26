const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username : {
    type : String,
    required : true
  },
  photo : String,
  caption : String,
  date : {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      author: {
        author_name: String,
        author_username: String,
        author_id: String,
        author_photo: String
      },
      text: String
    }
  ],
  likes : [
    {
      liked_by: String
    }
  ],
  tags : [
    {
      hashtag: String
    }
  ]
});

postSchema.methods.like = function(name) {
  this.likes.push(name)
  return this.save();
}

postSchema.methods.comment = function(comment) {
    this.comments.push(comment)
    return this.save()
}

module.exports = mongoose.model('Post', postSchema);
