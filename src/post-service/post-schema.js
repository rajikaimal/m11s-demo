const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({ title: String, date: Date, content: String });

module.exports = postSchema;
