const userModel = require("../../models/userModel");
var bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email) {
      throw new Error("Plese Provide Email....");
    }
    if (!password){
      throw new Error("Plese Provide Password....");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is Wrong....");
    }

    if (!name) {
      throw new Error("Plese Provide name....");
    }
    // password = hashPassword;
    const userData = new userModel({
      ...req.body,
      password: hashPassword,
    });
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created SuccessFully",
    });
  } catch (err) {
    messege = "";
    if (err.code == 11000) {
      message = "Email is already existed...."; 
    }
    res.json({
      message: message || err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
