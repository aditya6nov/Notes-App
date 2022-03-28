// const bcrypt = require("bcryptjs/dist/bcrypt");
const expressAsyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error occured in uderControoler.js");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const {email, password } = req.body;

  const user = await User.findOne({email});

  //check if the user exists and match the passwaord
  if (user && (await user.matchpassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  } 
});

const updateUserProfile = expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if(req.body.password){
      user.password=req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      pic: updateUser.pic,
      token: generateToken(updateUser._id),
    });
  }else{
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
