const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const commentSchema = new Schema({
  username: [{User}],
  description: String,
  date: Date,
  upvote: Number,
  reply: [{Comment}]
});

module.exports = Model("Comment", commentSchema);
