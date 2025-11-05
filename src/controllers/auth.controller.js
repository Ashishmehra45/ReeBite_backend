const userModel = require("../models/user.model");
require("dotenv").config();
const foodepartnerModel = require("../models/patner.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registeruser(req, res) {
  const { fullname, email, password } = req.body;

  const isExistinguser = await userModel.findOne({ email });
  if (isExistinguser) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fullname,
    email,
    password: hashpassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user register succefully",
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });
  if (!user) {
   return  res.status(400).json({
      message: "invalid email or password",
    });
  }
  const isvalidpassword = await bcrypt.compare(password, user.password);
  if (!isvalidpassword) {
    return res.status(400).json({
      message: "inavlid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user login succefully",
    user: {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
    },
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  res.status(201).json({
    message: "user logout",
  });
}

async function registerfoodPartner(req, res) {
  const { name, email, password, contact, address } = req.body;

 const isExistingFoodpartner = await foodepartnerModel.findOne({ email });

  if (isExistingFoodpartner) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const foodhashpassword = await bcrypt.hash(password, 10);
  const foodepartnerUser = await foodepartnerModel.create({
    name,
    email,
    password: foodhashpassword,
    contact,
    address,
  });

  const token = jwt.sign(
    {
      id: foodepartnerUser._id,
    },
    process.env.SECRET_KEY
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "foodpartner created successfully",
    foodepartnerUser: {
      name: foodepartnerUser.name,
      email: foodepartnerUser.email,
      id: foodepartnerUser._id,
      contact: foodepartnerUser.contact,
      address: foodepartnerUser.address,
    },
  });
}

async function loginfoodpartner(req, res) {
  const { email, password } = req.body;

  const foodepartnerUser = await foodepartnerModel.findOne({
    email,
  });
  if (!foodepartnerUser) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }
  const isvalidpassword = await bcrypt.compare(
    password,
    foodepartnerUser.password
  );
  if (!isvalidpassword) {
    return res.status(400).json({
      message: "inavlid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: foodepartnerUser._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user login succefully",
    foodepartnerUser: {
      _id: foodepartnerUser._id,
      email: foodepartnerUser.email,
      name: foodepartnerUser.name,
    },
  });
}

async function foodpartnerlogout(req, res) {
  res.clearCookie("token");
  res.status(201).json({
    message: "user logout",
  });
}

module.exports = {
  registeruser,
  login,
  logout,
  registerfoodPartner,
  loginfoodpartner,
  foodpartnerlogout,
};
