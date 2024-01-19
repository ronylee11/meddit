// Define Schema for each User
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  feeds: [{ type: Schema.Types.ObjectId, ref: "Feed" }],
});

module.exports = Model("User", userSchema);
