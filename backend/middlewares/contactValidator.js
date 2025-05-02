/**
 * backend/middlewares/contactValidator.js
 *
 * Validaciones para creación y actualización de Contact.
 */
const { check } = require('express-validator');

const createContactValidation = [
  check('firstName')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  check('email')
    .isEmail()
    .withMessage('El email debe ser válido')
];

module.exports = { createContactValidation };
