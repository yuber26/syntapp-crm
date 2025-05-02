/**
 * backend/controllers/leadController.js
 *
 * Lógica para la entidad Lead.
 */
const { Lead } = require('../models');

/**
 * GET /leads
 * Devuelve todos los leads.
 */
exports.getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /leads/:id
 * Devuelve un lead por ID.
 */
exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      const error = new Error('Lead no encontrado.');
      error.statusCode = 404;
      throw error;
    }
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /leads
 * Crea un nuevo lead.
 */
exports.createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /leads/:id
 * Actualiza un lead existente.
 */
const { autoQualifyLead } = require('../services/leadService'); // 👈 importar service

exports.updateLead = async (req, res, next) => {
  try {
    // 🔥 Ejecutamos lógica de auto-calificación antes de actualizar
    const leadData = autoQualifyLead(req.body);

    const [updated] = await Lead.update(leadData, {
      where: { id: req.params.id }
    });

    if (!updated) {
      const error = new Error('Lead no encontrado.');
      error.statusCode = 404;
      throw error;
    }

    const updatedLead = await Lead.findByPk(req.params.id);
    res.json(updatedLead);
  } catch (error) {
    next(error);
  }
};


/**
 * DELETE /leads/:id
 * Elimina un lead existente.
 */
exports.deleteLead = async (req, res, next) => {
  try {
    const deleted = await Lead.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      const error = new Error('Lead no encontrado.');
      error.statusCode = 404;
      throw error;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}