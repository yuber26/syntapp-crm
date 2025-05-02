/**
 * middleware/checkAuth.js
 *
 * Verifica que el usuario esté autenticado usando un token JWT.
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Validar si el header contiene el token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adjuntar los datos del usuario al objeto request
    req.user = decoded;

    next(); // Token válido → sigue a la siguiente función
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

