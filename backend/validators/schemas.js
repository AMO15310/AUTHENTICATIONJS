// const { string } = require("joi");
const Joi = require("joi");

const sighn_up_schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const log_in_schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { sighn_up_schema, log_in_schema };
