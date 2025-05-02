/**
 * backend/middlewares/validationMiddleware.js
 *
 * Middleware genérico de validación usando express-validator.
 * Envía los errores al manejador global.
 */
const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Error de validación de campos.');
    error.statusCode = 400;
    error.errors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    return next(error); // 🔥 Ahora se maneja de forma centralizada
  }

  next();
};

module.exports = { validateFields };
