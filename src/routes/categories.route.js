const express = require('express');
const { addNewCategory, getAllCategories } = require('../controllers/categories.controller');
const tokenValidation = require('../middlewares/tokenValidation');
require('express-async-errors');

const router = express.Router();

router.route('/')
  .post(tokenValidation, addNewCategory)
  .get(tokenValidation, getAllCategories);

module.exports = router;
