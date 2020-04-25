const mongoose = require("mongoose");

async function connectMongo() {
	await mongoose.connect(`${process.env.dbConnection}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}

module.exports = {
	connectMongo
};

