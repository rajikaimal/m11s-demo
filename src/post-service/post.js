const postSchema = require("./post-schema");
const mongoose = require("mongoose");
const Post = mongoose.model('Post', postSchema);

const getPosts = async () => {
	const allPosts = await Post.find({});
	return allPosts;
}

const createPost = async (newPost) => {
	console.log(newPost);
	try {
		const newPostToSave = new Post({
			title: newPost.title,
			date: new Date(),
			content: newPost.content
		});	

		return await newPostToSave.save();
	}
	catch(ex) {
		return ex;
	}
}

const updatePost = async (pdatePost) => {
	try {
		const res = await Post.updateOne({
   		_id: updatePost.id
		}, { content: updatePost.content }, { upsert: true });

		return res;
	}
	catch(ex) {
		return ex;
	}
}

const deletePost = async (post) => {
	try {
		const res = await Post.deleteOne({ _id: post.id });
		return res;
	}
	catch(ex) {
		return ex;
	}
}

module.exports = {
	getPosts,
	createPost,
	updatePost,
	deletePost
};

