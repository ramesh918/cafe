const Joi = require('joi');

// Define Joi schema for café data validation
const cafeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  logo: Joi.string().optional(),
  location: Joi.string().required(),
  id: Joi.string().uuid().optional(),
});

module.exports = {
  cafeSchema,
};