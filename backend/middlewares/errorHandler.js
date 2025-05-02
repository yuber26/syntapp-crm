const { ValidationError, UniqueConstraintError, DatabaseError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = undefined;

  // 🎯 Manejo de errores Sequelize - Validaciones y unicidad
  if (err instanceof ValidationError) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // 🚀 Caso especial: violación de restricción única
      statusCode = 409;
      message = 'Violación de restricción única.';
    } else {
      // 🚀 Caso normal de error de validación
      statusCode = 400;
      message = 'Error de validación de datos.';
    }
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
  }

  // 🎯 Manejo de errores Sequelize - Errores internos de DB
  else if (err instanceof DatabaseError) {
    statusCode = 500;
    message = 'Error interno de base de datos.';
    errors = [{ message: err.message }];
  }

  // 🧠 Manejo de errores personalizados o manuales (como express-validator)
  else if (err.errors && Array.isArray(err.errors)) {
    errors = err.errors;
  }

  // ✅ Respuesta JSON estandarizada
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      ...(errors && { errors })
    }
  });
};

module.exports = { errorHandler };
