require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '15d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    const message = error.message.includes('jwt must be provided') 
      ? 'Token not found' 
      : 'Expired or invalid token';
    const e = new Error(message);
    e.status = 401;
    throw e;
  }
};

const decodeToken = (token) => {
  const { payload: { data: { email } } } = jwt.decode(token, { complete: true });
  return email;
};

module.exports = {
  createToken,
  validateToken,
  decodeToken,
};
