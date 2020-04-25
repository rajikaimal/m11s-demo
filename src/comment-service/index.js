const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const comment = require("./comment");

db.connectMongo();
app.use(bodyParser.json());

app.get("/api/v1", async (req, res) => {
	try {
		const postId = req.query.postId;
		const posts = await comment.getComments(postId);

		res.json({
			status: true,
			posts
		});
	}
	catch(ex) {
		res.json({
			status: false
		});
	}
});

app.post("/api/v1", async (req, res) => {
	try {
		const newComment = req.body;
		const createdComment = await comment.createComment(newComment);
		res.json({
			status: true,
			createdComment
		});
	}
	catch(ex) {
		res.json({
			status: false
		});
	}
});

app.put("/api/v1", async (req, res) => {
	try {
		const updateComment = req.body;
		const updatedComment = await comment.updateComment(updateComment);
		res.json({
			status: true,
			updatedComment 
		});
	}
	catch(ex) {
		res.json({
			status: false
		});
	}
});

app.delete("/api/v1", async (req, res) => {
	try {
		const postId = req.body._id;
		const deleted = await comment.deleteComment(postId);
		res.json({
			status: true
		});
	}
	catch(ex) {
		res.json({
			status: false
		});
	}
});


app.listen(PORT, (err) => {
	if(!err)
		console.log(`Comment service running ${PORT}`);
});

