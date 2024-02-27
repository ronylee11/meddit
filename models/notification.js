const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const notificationSchema = new Schema({
  title: String,
  description: String,
  timestamp: Date,
  url: String
});

module.exports = Model("Notification", notificationSchema);