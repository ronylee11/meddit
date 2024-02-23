const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  date: Date,
  upvote: Number,
  reply: [{type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = Model("Comment", commentSchema);
