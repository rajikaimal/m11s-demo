const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./db");
const post = require("./post");

db.connectMongo();
app.use(bodyParser.json());

app.get("/api/v1", async (req, res) => {
	try {
		const posts = await post.getPosts();

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
		const newPost = req.body;
		const createdPost = await post.createPost(newPost);
		res.json({
			status: true,
			createdPost
		});
	}
	catch(ex) {
		res.json({
			status: false
		});
	}
});

app.put("/api/v1", (req, res) => {
	res.json({
		status: true
	});
});

app.delete("/api/v1", (req, res) => {
	res.json({
		status: true
	});
});


app.listen(PORT, (err) => {
	if(!err)
		console.log(`Post service running ${PORT}`);
});

