const { Category } = require('../models');
const { addNewCategorySchema } = require('./validations/schemas');

const addNewCategory = async (category) => {
  const { error } = addNewCategorySchema.validate(category);
  if (error) {
    const e = new Error(error.message);
    e.status = 400;
    throw e;
  }
  const id = await Category.create(category);
  return { id, ...category };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  if (!categories) throw new Error();
  return categories;
};

module.exports = {
  addNewCategory,
  getAllCategories,
};
