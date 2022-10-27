const { addNewUserSchema } = require('./validations/schemas');
const { User } = require('../models');
const { createToken } = require('../utils/jwt');

const addNewUser = async (user) => {
  const { error } = addNewUserSchema.validate(user);
  if (error) {
    const e = new Error(error.message);
    e.status = 400;
    throw e;
  }

  const person = await User.findOne({ where: { email: user.email } });
  if (person) {
    const e = new Error('User already registered');
    e.status = 409;
    throw e;
  }

  await User.create(user);
  const { password: _, ...rest } = user;
  return createToken(rest);
};

const getAllUsers = async () => {
  const users = await User.findAll();
  if (!users) throw new Error();
  const result = [...users].map(({ dataValues }) => {
    const { password: _, ...rest } = dataValues;
    return rest;
  });
  return result;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const e = new Error('User does not exist');
    e.status = 404;
    throw e;
  }
  const { dataValues: { password: _, ...rest } } = user;
  return rest;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const deleteMe = async (id) => User.destroy({
  where: { id },
});

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteMe,
};
