const Joi = require('joi');

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const addNewUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const addNewCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const editPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const addNewPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

module.exports = {
  userLoginSchema,
  addNewUserSchema,
  addNewCategorySchema,
  editPostSchema,
  addNewPostSchema,
};
