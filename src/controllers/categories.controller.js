const categoriesService = require('../services/categories.service');

const addNewCategory = async (req, res) => {
  const category = req.body;
  const newCategory = await categoriesService.addNewCategory(category);
  res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const categories = await categoriesService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = {
  addNewCategory,
  getAllCategories,
};
