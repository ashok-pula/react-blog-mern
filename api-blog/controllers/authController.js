const bcrypt = require("bcrypt");
const User = require("../models/User");
//Register//
const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) return res.status(400).json("user already registered");

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) return res.status(404).json("user not found");
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userFound.password
    );
    if (!passwordMatch) return res.status(400).json("password is wrong");
    const { password, ...others } = userFound._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
