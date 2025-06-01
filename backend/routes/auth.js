const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const user = new User({ name, email, password, phone });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Forgot Password
router.post("/forgot", async (req, res) => {
  const { email, phone, newPassword } = req.body;
  const user = await User.findOne({ email, phone });
  if (user) {
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } else {
    res.status(400).json({ error: "Invalid details" });
  }
});

module.exports = router;
