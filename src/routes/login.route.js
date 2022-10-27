const express = require('express');
const { login } = require('../controllers/login.controller');
require('express-async-errors');

const router = express.Router();

router.post('/', login);

module.exports = router;
