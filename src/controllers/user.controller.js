const userService = require('../services/user.service');
const { decodeToken } = require('../utils/jwt');

const addNewUser = async (req, res) => {
  const user = req.body;
  const token = await userService.addNewUser(user);
  res.status(201).json({ token });
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(200).json(user);
};

const deleteMe = async (req, res) => {
  const token = req.get('Authorization');
  const email = decodeToken(token);
  const { dataValues } = await userService.getUserByEmail(email);
  await userService.deleteMe(dataValues.id);
  res.status(204).end();
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  deleteMe,
};
