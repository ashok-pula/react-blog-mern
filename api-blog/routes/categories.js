const express = require("express");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/categoriesController");

const router = express.Router();

//create category//
router.post("/", createCategory);

//get all category
router.get("/", getAllCategory);

module.exports = router;
