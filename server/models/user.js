const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  isActivated: {
    type: Boolean,
    required: true,
  },
  actNum: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
