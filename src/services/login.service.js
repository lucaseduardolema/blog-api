const { User } = require('../models');
const { createToken } = require('../utils/jwt');
const { userLoginSchema } = require('./validations/schemas');

const validadeLogin = async (user) => {
  const { error } = userLoginSchema.validate(user);
  if (error) {
    const e = new Error('Some required fields are missing');
    e.status = 400;
    console.log(e);
    throw e;
  }

  const { email, password } = user;

  const person = await User.findOne({ where: { email } });

  if (!person || person.password !== password) {
    const e = new Error('Invalid fields');
    e.status = 400;
    throw e;
  }
  const { dataValues: { password: _, ...rest } } = person;
  return createToken(rest);
};

module.exports = {
  validadeLogin,
};
