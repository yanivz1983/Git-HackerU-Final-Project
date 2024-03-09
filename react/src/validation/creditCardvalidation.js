import Joi from "joi";
import validation from "./validation";

const creditCardSchema = Joi.object({
  cardNumber: Joi.string().creditCard().required(),
  cardHolder: Joi.string().required(),
  expiryDate: Joi.object({
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(new Date().getFullYear()).required(),
  }).required(),
  cvv: Joi.string()
    .pattern(/^\d{3,4}$/)
    .required(),
});

const validateCreditCard = (inputToCheck) =>
  validation(creditCardSchema, inputToCheck);

export { validateCreditCard };
