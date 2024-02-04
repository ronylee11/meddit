const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const feedSchema = new Schema({
  title: String,
  description: String,
});

module.exports = Model("Feed", feedSchema);
