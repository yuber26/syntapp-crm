/**
 * backend/models/Company.js
 *
 * Modelo Sequelize para la entidad Company.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  /** UUID único, generado automáticamente */
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  /** Nombre de la empresa; requerido y único */
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // 👈 Agregamos restricción única
  },
  /** Industria o sector de la empresa */
  industry: {
    type: DataTypes.STRING
  },
  /** Sitio web; debe ser URL válida */
  website: {
    type: DataTypes.STRING,
    validate: { isUrl: true }
  }
});

module.exports = Company;
