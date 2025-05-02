/**
 * backend/controllers/contactController.js
 *
 * Lógica para GET /contacts.
 */
const { Contact } = require('../models');

/**
 * GET /contacts
 * Devuelve todos los contactos como un array JSON.
 */
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.json(contacts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /contacts
 * Crea un nuevo contacto con los datos del body.
 */
exports.createContact = async (req, res) => {
    try {
      const newContact = await Contact.create(req.body);
      return res.status(201).json(newContact);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  
  /**
 * PUT /contacts/:id
 * Actualiza un contacto existente.
 */
exports.updateContact = async (req, res) => {
    try {
      const [updatedRows] = await Contact.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updatedRows) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
      const updatedContact = await Contact.findByPk(req.params.id);
      return res.json(updatedContact);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  
  /**
 * GET /contacts/:id
 * Devuelve un contacto por su ID.
 */
exports.getContactById = async (req, res) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
      return res.json(contact);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
  /**
 * DELETE /contacts/:id
 * Elimina un contacto existente.
 */
exports.deleteContact = async (req, res) => {
    try {
      const deletedRows = await Contact.destroy({
        where: { id: req.params.id }
      });
      if (!deletedRows) {
        return res.status(404).json({ error: 'Contacto no encontrado' });
      }
      // 204: borrado exitoso sin contenido
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };