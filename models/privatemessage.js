const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const privatemessageSchema = new Schema({
  sender: [{type: Schema.Types.ObjectId, ref: "User" }],
  receiver: [{type: Schema.Types.ObjectId, ref: "User" }],
  message: String,
  timestamp: Date,
  sequence: Number
});

module.exports = Model("PrivateMessage", privatemessageSchema);