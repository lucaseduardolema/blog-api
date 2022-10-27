const { Category } = require('../models');

const verifyAllCategories = async (categories) => {
  const result = await Promise.all(
    categories.map(async (categoryId) => Category.findByPk(categoryId)),
  );

  if (result.some((r) => !r)) {
    const e = new Error('one or more "categoryIds" not found');
    e.status = 400;
    throw e;
  }
};

module.exports = verifyAllCategories;
