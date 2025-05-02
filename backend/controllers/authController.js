/**
 * backend/controllers/authController.js
 *
 * Registro de usuarios con encriptación de contraseña y plan de prueba.
 */

const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Correo ya registrado.' });
    }

    // 2. Encriptar la contraseña con bcrypt
    const salt = await bcrypt.genSalt(10); // número de "vueltas" del hash
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Calcular fecha de expiración del plan trial
    const trialDays = 20;
    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + trialDays * 24 * 60 * 60 * 1000);

    // 4. Crear el usuario en la base de datos
    const newUser = await User.create({
      email,
      password: hashedPassword, // Contraseña ya encriptada
      plan: 'pro_trial',
      trialEndsAt,
      subscriptionEndsAt: null
    });

    // 5. Respuesta de éxito
    return res.status(201).json({
      message: 'Usuario registrado con éxito.',
      user: {
        id: newUser.id,
        email: newUser.email,
        plan: newUser.plan,
        trialEndsAt: newUser.trialEndsAt
      }
    });
  } catch (err) {
    next(err); // Pasa errores al manejador global
  }
};

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
  try {
    // 1. Validar datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 2. Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas (email)' });
    }

    // 3. Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas (contraseña)' });
    }

    // 4. Crear y firmar token JWT
    const payload = {
      id: user.id,
      email: user.email,
      plan: user.plan,
      trialEndsAt: user.trialEndsAt
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    // 5. Respuesta con token
    res.json({
      message: 'Login exitoso',
      token
    });
  } catch (err) {
    next(err);
  }
};
