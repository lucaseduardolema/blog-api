const { validadeLogin } = require('../services/login.service');

const login = async (req, res) => {
  const user = req.body;
  const token = await validadeLogin(user);
  res.status(200).json({ token });
};

module.exports = {
  login,
};