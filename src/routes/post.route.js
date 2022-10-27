const express = require('express');
const {
  getAllPosts,
  getPostById,
  updatePost,
  getPostBySearchTerm,
  addNewPost,
  deletePostById,
} = require('../controllers/post.controller');
const tokenValidation = require('../middlewares/tokenValidation');
require('express-async-errors');

const router = express.Router();

router.get('/search', tokenValidation, getPostBySearchTerm);

router.route('/')
  .get(tokenValidation, getAllPosts)
  .post(tokenValidation, addNewPost);

router
  .route('/:id')
  .get(tokenValidation, getPostById)
  .put(tokenValidation, updatePost)
  .delete(tokenValidation, deletePostById);

module.exports = router;
