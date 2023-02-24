//create post

const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can only update your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const deletePost = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can only delete your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllPosts = async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  // console.log(catname);
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({ categories: { $in: [catname] } });
      // console.log(posts);
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createPost, updatePost, deletePost, getPost, getAllPosts };
