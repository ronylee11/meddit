const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  date: Date,
  upvotes: [{type: Schema.Types.ObjectId, ref: "User" }],
  reply: [{type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = Model("Comment", commentSchema);
