const Joi = require("joi");

const CreditCardSchema = Joi.object({
  cardNumber: Joi.string().required().max(16),
  cardHolder: Joi.string().required().min(4).max(26),
  expiryDate: Joi.object({
    month: Joi.number().required(),
    year: Joi.number().required(),
  }).required(),
  cvv: Joi.string().required().min(3).max(4),
});

export { CreditCardSchema as joiCreditCardSchema };
