const express = require("express");
const authroute = express.Router();
const data = require("../Database/data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authroute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await data.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "klikskey", {
      expiresIn: "400h",
    });

    res.cookie("klikscookie", token);

    res.json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error", details: e.message });
  }
});

authroute.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await data.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const storingdata = new data({
      Name: name,
      Email: email,
      Password: hashed_password,
    });

    await storingdata.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error", details: e.message });
  }
});

module.exports = authroute;
