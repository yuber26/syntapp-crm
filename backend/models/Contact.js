/**
 * backend/models/Contact.js
 *
 * Modelo Sequelize para Contacto.
 * Define las propiedades y validaciones de un contacto.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  /** UUID único, generado automáticamente */
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  /** Nombre del contacto; requerido */
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  /** Apellido del contacto */
  lastName: {
    type: DataTypes.STRING
  },
  /** Correo electrónico; único y con formato válido */
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  /** Teléfono de contacto */
  phone: {
    type: DataTypes.STRING
  },
  /** Origen del lead (por defecto “web”) */
  source: {
    type: DataTypes.STRING,
    defaultValue: 'web'
  },
  /** Estado en el pipeline (por defecto “new”) */
  status: {
    type: DataTypes.STRING,
    defaultValue: 'new'
  }
});

module.exports = Contact;
