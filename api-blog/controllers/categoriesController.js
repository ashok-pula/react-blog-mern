const Category = require("../models/Category.js");
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedcat = await category.save();
    res.status(200).json(savedcat);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllCategory = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
};
getAllCategory;

module.exports = { createCategory, getAllCategory };
