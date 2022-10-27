const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');
const verifyAllCategories = require('../utils/verifyAllCategories');
const { editPostSchema, addNewPostSchema } = require('./validations/schemas');

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });

  if (!post) {
    const e = new Error('Post does not exist');
    e.status = 404;
    throw e;
  }

  return post;
};

const updatePost = async (id, post, userId) => {
  const { error } = editPostSchema.validate(post);
  if (error) {
    const e = new Error('Some required fields are missing');
    e.status = 400;
    throw e;
  }

  const [updated] = await BlogPost.update(post, { where: { id, userId } });
  if (updated === 0) {
    const e = new Error('Unauthorized user');
    e.status = 401;
    throw e;
  }

  return getPostById(id);
};

const getPostBySearchTerm = async (term) => {
  const post = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${term}%` } },
      { content: { [Op.like]: `%${term}%` } },
    ], 
  },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
  });
  return post;
};

const addNewPost = async (post, userId) => {
  const { error } = addNewPostSchema.validate(post);
  if (error) {
    const e = new Error('Some required fields are missing');
    e.status = 400;
    throw e;
  }
  const { title, content, categoryIds } = post;

  await verifyAllCategories(categoryIds);

  const { dataValues: { id } } = await BlogPost.create({ title, content, userId });
  
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: id, categoryId });
  }));
  
  return BlogPost.findByPk(id);
};

const deletePostById = async (userId, id) => {
  const post = await BlogPost.findByPk(id);
  if (!post) {
    const e = new Error('Post does not exist');
    e.status = 404;
    throw e;
  }

  const rows = await BlogPost.destroy({
    where: { id, userId },
  });
  
  if (rows === 0) {
    const e = new Error('Unauthorized user');
    e.status = 401;
    throw e;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  getPostBySearchTerm,
  addNewPost,
  deletePostById,
};
