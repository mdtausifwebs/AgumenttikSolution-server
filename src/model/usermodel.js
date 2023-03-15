const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  {
    timeseries: true,
    versionKey: false,
  }
);
userModel.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.PASSCODE);
};
module.exports = mongoose.model("users", userModel);
