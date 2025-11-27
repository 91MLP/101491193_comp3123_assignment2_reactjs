const User = require("../models/userModel");
const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
exports.signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await Users.create({
      username,
      password: hashPassword,
      email,
    });
    res.status(201).json({
      status: "success",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
