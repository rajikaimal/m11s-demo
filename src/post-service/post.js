const postSchema = require("./post-schema");
const mongoose = require("mongoose");
const Post = mongoose.model('Post', postSchema);

const getPosts = async () => {
	try {
		const allPosts = await Post.find({});
		const returnPosts = allPosts.map(post => {
			return {
				title: post.title,
				date: post.date,
				content: post.content
			}	
		});

		return returnPosts;
	}
	catch(ex) {
		return ex;
	}
}

const createPost = async (newPost) => {
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

