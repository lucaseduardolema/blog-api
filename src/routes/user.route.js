const express = require('express');
const { 
  addNewUser, 
  getAllUsers, 
  getUserById, 
  deleteMe, 
} = require('../controllers/user.controller');
const tokenValidation = require('../middlewares/tokenValidation');
require('express-async-errors');

const router = express.Router();

router.route('/')
  .post(addNewUser)
  .get(tokenValidation, getAllUsers);

router.route('/:id')
  .get(tokenValidation, getUserById);

router.delete('/me', tokenValidation, deleteMe);

module.exports = router;
