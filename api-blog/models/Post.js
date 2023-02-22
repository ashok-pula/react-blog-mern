const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    photo: { type: String, required: false, default: "" },
    username: { type: String, required: true },
    category: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
