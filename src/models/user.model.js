const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('user', UserSchema)
