/**
 * backend/routes/campaigns.js
 *
 * Rutas para la entidad Campaign.
 */

const express = require('express');
const router = express.Router();

// ✅ Controlador que maneja la lógica de las campañas
const campaignController = require('../controllers/campaignController');

// ✅ Middleware para validar datos (express-validator)
const { validateFields } = require('../middlewares/validationMiddleware');

// 🔒 Middleware para limitar acceso por plan
const { planLimiter } = require('../middlewares/planLimiter');

// 📌 Ruta protegida: crear campaña (solo PRO en adelante)
router.post(
  '/',
  planLimiter('pro'),                     // 🔒 Solo plan pro o superior
  validateFields,                         // ✅ Valida los campos si hay reglas (más adelante)
  campaignController.createCampaign       // 🎯 Función que crea la campaña
);

// 📌 Ruta libre: listar todas las campañas
router.get('/', campaignController.getAllCampaigns);

// (Opcional: agregar PUT y DELETE después)

module.exports = router;

