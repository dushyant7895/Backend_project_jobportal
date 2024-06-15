const express = require("express");
const router = express.Router();

const ValidateNewUser = require('../middleware/ValidateNewUser');
const {registerUser,handleLogin} = require('../controllers/userController');

router.get("/", (req, res) => {
  res.json({
    message: "Router works Fine",
    active: true,
  });
});
// we will validation middleware
router.post("/register",ValidateNewUser, registerUser());

router.get("/login", handleLogin());

module.exports = router;


