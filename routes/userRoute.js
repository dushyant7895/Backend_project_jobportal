const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ValidateNewUser = require('../middleware/ValidateNewUser');


router.get("/", (req, res) => {
  res.json({
    message: "Router works Fine",
    active: true,
  });
});
// we will validation middleware
router.post("/register",ValidateNewUser, async (req, res) => {

  try {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  
  if(existingUser){
    res.status(400).json({
      message:"User All ready exist, Please enter another email"
    });
  }
  else{
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({ name, email, password:hashPassword });
  await newUser.save();
  res.status(201).json({
    message: "New User Created successfully",
    success: true,
    user: newUser,
  });
  }
    //we need to handle case where email already exist
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const iscorrectPassword = await bcrypt.compare(password, existingUser.password);
      if (iscorrectPassword) {
        const token = jwt.sign(
          {email: existingUser.email},  //payload 
          'secret',                       // secret key
          {expiresIn:'2h'}                // timer 
        );
        res.status(200).json({
          success: true,
          message: "User Login succssfully",
          email: existingUser.email,
          token
        });
      }
      else{
        res.status(400).json({
          
          message:"Password not match"
        });
      }
    } else {
      res.status(401).json({
        
        message: "No user found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
      message: "Server Error",
    });
  }
});

module.exports = router;
