const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function useSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Plese Provide Email...😣");
    }
    if (!password) {
      throw new Error("Plese Provide Password...😣");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Existed...😣");
    }

    const check = await bcrypt.compare(password, user.password); // true
    if (!check) {
      throw new Error("Invalid Password....🙄");
    }

    const token_data = {
      _id: user._id,
      email: user.name,
      name: user.name,
    };
    const token = await jwt.sign(token_data, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "12h",
    });
    const token_options = {
      httpOnly: true,
      secure: true,
      SameSite: "none",
    };
    res.cookie("token", token, token_options).status(200).json({
      succuss: true,
      error: false,
      message: "Login Successfully...🤩",
      data: token,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = useSignInController;
