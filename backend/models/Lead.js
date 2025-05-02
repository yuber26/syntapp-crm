/**
 * backend/models/Lead.js
 *
 * Modelo Sequelize para la entidad Lead.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {
  /** UUID único para el Lead */
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  /** Nombre del Lead (obligatorio) */
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /** Apellido del Lead (opcional) */
  lastName: {
    type: DataTypes.STRING
  },
  /** Email del Lead (obligatorio, debe ser válido) */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  /** Teléfono de contacto (opcional) */
  phone: {
    type: DataTypes.STRING
  },
  /** Estado actual del Lead */
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'qualified', 'lost'),
    allowNull: false,
    defaultValue: 'new'
  },
  /** Fuente de captación del Lead */
  source: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true // createdAt y updatedAt automáticos
});

module.exports = Lead;
