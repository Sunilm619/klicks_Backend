const { default: mongoose } = require("mongoose");
const validator = require("validator");

const modeldata = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [100, "Password cannot exceed 100 characters"],
  },
});

module.exports = mongoose.model("data", modeldata);
