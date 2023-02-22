const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} = require("../controllers/postsController");

const router = express.Router();

//create post//
router.post("/", createPost);

//update post
router.put("/:id", updatePost);

//delete post
router.delete("/:id", deletePost);

//get post
router.get("/:id", getPost);

//get all posts
router.get("/", getAllPosts);

module.exports = router;
