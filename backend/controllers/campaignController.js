/**
 * backend/controllers/campaignController.js
 *
 * Lógica para la entidad Campaign.
 */
const { Campaign } = require('../models');

/**
 * GET /campaigns
 * Devuelve todas las campañas como un array JSON.
 */
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    return res.json(campaigns);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /campaigns
 * Crea una nueva campaña con los datos del body.
 */
exports.createCampaign = async (req, res, next) => {
  try {
    // Simulación simple por ahora
    const newCampaign = {
      id: crypto.randomUUID(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    res.status(201).json(newCampaign);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /campaigns/:id
 * Actualiza una campaña existente.
 */
exports.updateCampaign = async (req, res) => {
    try {
      const [updatedRows] = await Campaign.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updatedRows) {
        return res.status(404).json({ error: 'Campaña no encontrada' });
      }
      const updatedCampaign = await Campaign.findByPk(req.params.id);
      return res.json(updatedCampaign);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  
  /**
 * DELETE /campaigns/:id
 * Elimina una campaña existente.
 */
exports.deleteCampaign = async (req, res) => {
    try {
      const deletedRows = await Campaign.destroy({
        where: { id: req.params.id }
      });
      if (!deletedRows) {
        return res.status(404).json({ error: 'Campaña no encontrada' });
      }
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  