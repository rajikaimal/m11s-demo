const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({ title: String, date: Date, category: String, content: String });

module.exports = postSchema;
