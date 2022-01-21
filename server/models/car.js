const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  carId: String,
  unitType: String,
  installed: Number,
  resource: Number,
  needToChange: Number,
  condition: String
})

const carSchema = new Schema({
  userId: String,
  garageId: String,
  model: String,
  registrationNumber: String,
  vinCode: String,
  mileage: Number,
  vehicalWeare: Number,
  details: [DetailSchema]
});

module.exports = mongoose.model("Car", carSchema);