const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  date: Date,
  upvotes: [{type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{type: Schema.Types.ObjectId, ref: "User" }],
  reply: [{type: Schema.Types.ObjectId, ref: "Comment" }]
});

commentSchema.pre("find", function(next){
  this.populate("reply").populate("author");
  next();
});

module.exports = Model("Comment", commentSchema);
