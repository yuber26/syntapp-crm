/**
 * backend/routes/companies.js
 *
 * Rutas para la entidad Company.
 */
const router = require('express').Router();
const {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companyController');

// GET /companies → lista todas las empresas
router.get('/', getAllCompanies);

// POST /companies → crea una nueva empresa
router.post('/', createCompany);

// PUT /companies/:id → actualiza una empresa existente
router.put('/:id', updateCompany);

// DELETE /companies/:id → elimina una empresa existente
router.delete('/:id', deleteCompany);

module.exports = router;
