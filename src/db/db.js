const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`❌ MongoDB Connection Error: ${err.message}`);
      process.exit(1); // DB fail → server band
    });
};

module.exports = connectDB;
