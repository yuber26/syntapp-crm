/**
 * backend/models/index.js
 *
 * Punto central de los modelos y relaciones.
 */
const sequelize = require('../config/database');
const Contact  = require('./Contact');
const Company  = require('./Company');
const Campaign = require('./Campaign');
const Lead     = require('./Lead');     // ✅ Ya existente
const User     = require('./User');     // ✅ Nuevo modelo agregado

// Relaciones
Company.hasMany(Contact);
Contact.belongsTo(Company);

// (En breve podrás definir relaciones con Campaign si hace falta)

module.exports = {
  sequelize,
  Contact,
  Company,
  Campaign,
  Lead,
  User // ✅ Exportado para uso global
};

