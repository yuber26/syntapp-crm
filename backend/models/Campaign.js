/**
 * backend/models/Campaign.js
 *
 * Modelo Sequelize para la entidad Campaign.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  /** UUID único, generado automáticamente */
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  /** Nombre de la campaña; requerido */
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /** Tipo de campaña (email, whatsapp, etc.) */
  type: {
    type: DataTypes.STRING
  },
  /** Estado de la campaña (draft, running, completed) */
  status: {
    type: DataTypes.STRING,
    defaultValue: 'draft'
  },
  /** Fecha de inicio */
  startDate: {
    type: DataTypes.DATE
  },
  /** Fecha de finalización */
  endDate: {
    type: DataTypes.DATE
  }
});

module.exports = Campaign;