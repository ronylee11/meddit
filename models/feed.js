const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const feedSchema = new Schema({
  userid: String,
  title: String,
  description: String,
  upvotes: [{type: Schema.Types.ObjectId, ref: "User" }],
  images: [{type: Schema.Types.ObjectId, ref:"Image"}],
  comments: [{type: Schema.Types.ObjectId, ref: "comment"}],
  author: {type: Schema.Types.ObjectId, ref:"User"}
});

module.exports = Model("Feed", feedSchema);
