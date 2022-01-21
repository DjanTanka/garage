const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  garageId: {
    type: String,
    required: true,
  },
  carId: {
    type: String,
    required: true,
  },
  masterId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateAdd: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
