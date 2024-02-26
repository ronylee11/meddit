const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const subredditSchema = new Schema({
  subname: String,
  description: String,
  feed: [{ type: Schema.Types.ObjectId, ref: "Feed"}]
});

module.exports = Model("Subreddit", subredditSchema);