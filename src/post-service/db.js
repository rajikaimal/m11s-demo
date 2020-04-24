const mongoose = require("mongoose");
const username = process.env.dbUsername;
const password = process.env.dbPassword;

async function connectMongo() {
	await mongoose.connect(`mongodb://${username}:${password}@ds037498.mlab.com:37498/fiction-paper`, {
  	useNewUrlParser: true,
  	useUnifiedTopology: true
	});
}

module.exports = {
	connectMongo
};

