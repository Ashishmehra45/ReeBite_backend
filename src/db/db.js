const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch((err) => {
      console.log("MongoDB error:", err);
    });
};

module.exports = connectDB;