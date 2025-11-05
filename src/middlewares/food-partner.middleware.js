const foodepartnerModel = require("../models/patner.model");
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");

async function foodpartneMiddleware(req, res, next) {
  const token = req.cookies?.token; 
  
  if (!token) {
    return res.status(401).json({ message: "please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foodpartner = await foodepartnerModel.findById(decoded.id); 

    if (!foodpartner) {
      return res.status(401).json({ message: "user not found" });
    }

    req.foodpartner = foodpartner;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
}

async function authuserMiddleare(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Auth Error:", err.message);
    return res.status(401).json({ message: "invalid token" });
  }
}

module.exports = { foodpartneMiddleware,
  authuserMiddleare
 };
