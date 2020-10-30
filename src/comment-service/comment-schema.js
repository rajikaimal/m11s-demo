const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: String,
  date: Date,
  comment: String,
});

module.exports = commentSchema;
