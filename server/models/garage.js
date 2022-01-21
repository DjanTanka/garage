const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const garageSchema = new Schema({
  userId: String,
  location: String,
  rent: Number,
  freeSpace: Number
});

module.exports = mongoose.model("Garage", garageSchema);