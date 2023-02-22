const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
//updating
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can only update your account");
  }
};
//deleting
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json("user not found");

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("account deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("user not found");
    }
  } else {
    res.status(401).json("you can only delete your account");
  }
};
//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { updateUser, deleteUser, getUser };
