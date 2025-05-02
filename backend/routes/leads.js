/**
 * backend/routes/leads.js
 *
 * Rutas para la entidad Lead.
 */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validationMiddleware');
const leadController = require('../controllers/leadController');

// Crear nuevo lead
router.post(
  '/',
  [
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    check('email', 'Debe ser un correo válido').isEmail(),
    check('status').optional().isIn(['new', 'contacted', 'qualified', 'lost']),
    validateFields
  ],
  leadController.createLead
);

// Obtener todos los leads
router.get('/', leadController.getAllLeads);

// Obtener un lead por ID
router.get('/:id', leadController.getLeadById);

// Actualizar un lead existente
router.put('/:id', leadController.updateLead);

// Eliminar un lead
router.delete('/:id', leadController.deleteLead);

module.exports = router;
