const { validateToken } = require('../utils/jwt');

const tokenValidation = (req, _res, next) => {
  const token = req.get('Authorization');
  validateToken(token);
  next();
};

module.exports = tokenValidation;
