const postSchema = require("./post-schema");
const Post = mongoose.model('Post', postSchema);

const getPosts = async () => {
	const allPosts = await Post.find({});
	return allPosts;
}

const createPost = async (newPost) => {
	const newPostToSave = new Post({
		title: newPost.title,
		content: newPost.date
	});	
}

const updatePost = async (pdatePost) => {
	try {
		const res = await Post.updateOne({
   		_id: updatePost.id
		}, { content: updatePost.content }, { upsert: true });

		return res;
	}
	catch(ex) {
		return null;
	}
}

const deletePost = async (post) => {
	try {
		const res = await Post.deleteOne({ _id: post:id });
		return res;
	}
	catch(ex) {
		return null;
	}
}

module.exports = {
	getPosts,
	createPost,
	updatePost,
	deletePost
};

