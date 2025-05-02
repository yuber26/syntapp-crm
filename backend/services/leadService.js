/**
 * backend/services/leadService.js
 *
 * Servicios de lógica de negocio para Leads.
 */

/**
 * Evalúa si un Lead puede ser calificado automáticamente.
 * Si tiene email y teléfono, cambia su estado a 'qualified'.
 *
 * @param {Object} leadData - Objeto del lead actualizado.
 * @returns {Object} - Datos actualizados del Lead.
 */
const autoQualifyLead = (leadData) => {
    if (leadData.email && leadData.phone) {
      leadData.status = 'qualified';
    }
    return leadData;
  };
  
  module.exports = {
    autoQualifyLead
  };
  