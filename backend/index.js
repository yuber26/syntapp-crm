/**
 * backend/index.js
 *
 * Punto de entrada de la API Syntapp CRM.
 * Configura Express, rutas y conexión a la base de datos.
 */

const express         = require('express');
const dotenv          = require('dotenv');
const healthRoute     = require('./routes/healthCheck');
const contactsRoute   = require('./routes/contacts');
const companiesRoute  = require('./routes/companies');
const campaignsRoute  = require('./routes/campaigns');
const leadsRoute      = require('./routes/leads'); // ✅ Nueva ruta importada
const { errorHandler } = require('./middlewares/errorHandler');
const { sequelize }   = require('./models/index');
const authRoute = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Rutas
app.get('/', (req, res) => res.send('Welcome to Syntapp CRM API'));
app.use('/health', healthRoute);
app.use('/contacts', contactsRoute);
app.use('/companies', companiesRoute);
app.use('/campaigns', campaignsRoute);
app.use('/leads', leadsRoute); // ✅ Registro correcto de nueva ruta
app.use('/auth', authRoute); // 👈 http://localhost:4000/auth/register

// Middleware global de errores (al final de las rutas)
app.use(errorHandler);

// Conexión y sincronización de la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log('✅ Database synchronized'))
  .catch(err => console.error('❌ DB Error:', err));

// Arranque del servidor
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
