const express = require("express");
const router = express.Router();
const User = require("./../models/User");

router.get("/", (req, res) => {
  res.json({
    message: "Router works Fine",
    active: true,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    await newUser.save();
    res.status(201).json({
      message: "New Entry Created successfully",
      success: true,
      user: newUser,
    });
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
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({
        success: true,
        message: "User Login succssfully",
        user: user,
      });
    }
    else{
        res.status(401).json({
            success:false,
            message:"users Details wrong",

        });
    }
  } catch (error) {
    console.error(erro);
    res.status(500).json({
      success: false,
      message: error.message,
      message: "Server Error",
    });
  }
});

module.exports = router;
