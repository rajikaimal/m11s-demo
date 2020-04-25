const mongoose = require("mongoose");
const username = process.env.dbUsername;
const password = process.env.dbPassword;

async function connectMongo() {
	await mongoose.connect(`${process.env.dbConnection}`, {
  	useNewUrlParser: true,
  	useUnifiedTopology: true
	});
}

module.exports = {
	connectMongo
};

