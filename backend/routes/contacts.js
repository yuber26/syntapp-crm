const router = require('express').Router();
const {
  getAllContacts,
  createContact,
  updateContact,
  getContactById,
  deleteContact
} = require('../controllers/contactController');

const { createContactValidation } = require('../middlewares/contactValidator');
const { validateFields } = require('../middlewares/validationMiddleware');

// 🛡 Importamos los middlewares
const checkAuth = require('../middlewares/checkAuth');
const checkExpiration = require('../middlewares/checkExpiration');

// ✅ Protege todas las rutas con autenticación y control de expiración
router.use(checkAuth);
router.use(checkExpiration);

// GET /contacts → lista todos los contactos
router.get('/', getAllContacts);

// GET /contacts/:id → devuelve un solo contacto por ID
router.get('/:id', getContactById);

// POST /contacts → crea un nuevo contacto (con validaciones)
router.post('/', createContactValidation, validateFields, createContact);

// PUT /contacts/:id → actualiza un contacto existente
router.put('/:id', updateContact);

// DELETE /contacts/:id → elimina un contacto existente
router.delete('/:id', deleteContact);

module.exports = router;
