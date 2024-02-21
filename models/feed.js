const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const feedSchema = new Schema({
  userid: String,
  title: String,
  description: String,
  images: [{type: Schema.Types.ObjectId, ref:"Image"}],
  comments: [{type: Schema.Types.ObjectId, ref: "comment"}]
});

module.exports = Model("Feed", feedSchema);
