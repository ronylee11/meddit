// Define Schema for each User
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: String,
  feeds: [{ type: Schema.Types.ObjectId, ref: "Feed" }],
});
userSchema.plugin(passportLocalMongoose);

module.exports = Model("User", userSchema);
