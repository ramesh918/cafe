// validations/employeeValidation.js

const Joi = require("joi");

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  email_address: Joi.string().email().required(),
  phone_number: Joi.string()
    .pattern(/^[89]\d{7}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must start with 8 or 9 and have 8 digits",
    }),
  gender: Joi.string().valid("Male", "Female", "Others").required(),
  cafeId: Joi.string().uuid().required(),
});

module.exports = {
  employeeSchema,
};
