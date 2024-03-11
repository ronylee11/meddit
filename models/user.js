// Define Schema for each User
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: String,
  feeds: [{ type: Schema.Types.ObjectId, ref: "Feed"}],
  subreddit: [{ type: Schema.Types.ObjectId, ref: "Subreddit"}],
  privatemessage: [{ type: Schema.Types.ObjectId, ref: "PrivateMessage"}],
  notification: [{ type: Schema.Types.ObjectId, ref: "Notification"}]
});
userSchema.plugin(passportLocalMongoose); // add username, password

module.exports = Model("User", userSchema);
