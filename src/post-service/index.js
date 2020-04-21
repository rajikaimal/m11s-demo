const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.json({
		status: true
	});
});

app.listen(PORT, (err) => {
	if(!err)
		console.log(`Post service running ${PORT}`);
});

