const commentSchema = require('./comment-schema');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment', commentSchema);

const getComments = async postId => {
  try {
    const allComments = await Comment.find({
      postId,
    });
    return allComments;
  } catch (ex) {
    return ex;
  }
};

const createComment = async newComment => {
  try {
    const newCommentSave = new Comment({
      postId: newComment.postId,
      comment: newComment.comment,
      date: new Date(),
    });

    console.log(newCommentSave);
    return await newCommentSave.save();
  } catch (ex) {
    return ex;
  }
};

const updateComment = async updatedComment => {
  try {
    const res = await Comment.updateOne(
      {
        _id: updatedComment._id,
        postId: updateComment.postId,
      },
      {$set: {content: updatedComment.comment}},
      {upsert: true},
    );

    return res;
  } catch (ex) {
    return ex;
  }
};

const deleteComment = async comment => {
  try {
    const res = await Comment.deleteOne({_id: comment});
    return res;
  } catch (ex) {
    return ex;
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
