const postSchema = require('./post-schema');
const mongoose = require('mongoose');
const Post = mongoose.model('Post', postSchema);

const getPosts = async () => {
  try {
    const allPosts = await Post.find({});
    return allPosts;
  } catch (ex) {
    return ex;
  }
};

const getPost = async id => {
  try {
    const post = await Post.find({_id: id});
    return post;
  } catch (ex) {
    return ex;
  }
};

const createPost = async newPost => {
  try {
    const newPostToSave = new Post({
      title: newPost.title,
      category: newPost.category,
      date: new Date(),
      content: newPost.content,
    });

    return await newPostToSave.save();
  } catch (ex) {
    return ex;
  }
};

const updatePost = async updatedPost => {
  try {
    const res = await Post.updateOne(
      {
        _id: updatedPost._id,
      },
      {$set: {content: updatedPost.content}},
      {upsert: true},
    );

    return res;
  } catch (ex) {
    return ex;
  }
};

const deletePost = async post => {
  try {
    const res = await Post.deleteOne({_id: post});
    return res;
  } catch (ex) {
    return ex;
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
