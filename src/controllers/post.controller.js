const postService = require('../services/post.service');
const { getUserByEmail } = require('../services/user.service');
const { decodeToken } = require('../utils/jwt');

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const token = req.get('Authorization');
  const email = decodeToken(token);
  const { dataValues } = await getUserByEmail(email);
  const postUpdated = await postService.updatePost(id, post, dataValues.id);
  res.status(200).json(postUpdated);
};

const getPostBySearchTerm = async (req, res) => {
  const { q } = req.query;
  const post = await postService.getPostBySearchTerm(q);
  res.status(200).json(post);
};

const addNewPost = async (req, res) => {
  const post = req.body;
  const token = req.get('Authorization');
  const email = decodeToken(token);
  const { dataValues } = await getUserByEmail(email);
  const newPost = await postService.addNewPost(post, dataValues.id);
  res.status(201).json(newPost);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const token = req.get('Authorization');
  const email = decodeToken(token);
  const { dataValues } = await getUserByEmail(email);
  await postService.deletePostById(dataValues.id, id);
  res.status(204).end();
};

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  getPostBySearchTerm,
  addNewPost,
  deletePostById,
};
