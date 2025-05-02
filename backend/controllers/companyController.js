/**
 * backend/controllers/companyController.js
 *
 * Lógica para la entidad Company.
 */
const { Company } = require('../models');

/**
 * GET /companies
 * Devuelve todas las empresas como un array JSON.
 */
exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.findAll();
    return res.json(companies);
  } catch (err) {
    next(err); // 🚀 Pasar error al middleware global
  }
};

/**
 * POST /companies
 * Crea una nueva empresa con los datos del body.
 */
exports.createCompany = async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    return res.status(201).json(newCompany);
  } catch (err) {
    next(err); // 🚀 Pasar error al middleware global
  }
};

/**
 * PUT /companies/:id
 * Actualiza una empresa existente.
 */
exports.updateCompany = async (req, res, next) => {
  try {
    const [updatedRows] = await Company.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updatedRows) {
      const error = new Error('Empresa no encontrada');
      error.statusCode = 404;
      throw error; // 🚀 Lanzar error manual para middleware global
    }
    const updatedCompany = await Company.findByPk(req.params.id);
    return res.json(updatedCompany);
  } catch (err) {
    next(err); // 🚀 Pasar error al middleware global
  }
};

/**
 * DELETE /companies/:id
 * Elimina una empresa existente.
 */
exports.deleteCompany = async (req, res, next) => {
  try {
    const deletedRows = await Company.destroy({
      where: { id: req.params.id }
    });
    if (!deletedRows) {
      const error = new Error('Empresa no encontrada');
      error.statusCode = 404;
      throw error; // 🚀 Lanzar error manual
    }
    return res.status(204).end();
  } catch (err) {
    next(err); // 🚀 Pasar error al middleware global
  }
};
