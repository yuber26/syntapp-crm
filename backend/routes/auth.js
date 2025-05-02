const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Ruta: POST /auth/register
// Función: Crea un nuevo usuario con plan de prueba (trial)
router.post('/register', registerUser);

// Ruta: POST /auth/login
// Función: Valida email y contraseña, devuelve token JWT si es correcto
router.post('/login', [
  body('email').isEmail().withMessage('Correo inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
], loginUser);

module.exports = router;
