const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilePic: String,
    role: {
      type: String,
      default: "GENERAL",
    },
    verificationCode: {
      type: String,
      required: false, // Optional if it doesn't always need to be present
    },
    verificationCodeExpires: {
      type: Date, // To store when the code expires
      required: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
