# Syntapp CRM API

API REST para gestionar **Contactos**, **Empresas** y **Campañas** de marketing digital, con persistencia en PostgreSQL y Docker.

---

📋 **Descripción**  
Syntapp CRM API es un back-end full-stack que incluye:  
- CRUD completo para los modelos Contact, Company y Campaign  
- Integración con PostgreSQL usando Sequelize  
- Contenedores Docker (Postgres, Backend, Frontend)  
- Health-check y documentación mínima de endpoints  

---

⚙️ **Prerrequisitos**  
1. Docker & Docker Compose  
2. Node.js LTS (solo si quieres ejecutar el backend fuera de Docker)  
3. Git  

---

🚀 **Instalación y arranque en local**  
```bash
# 1. Clona el repositorio
git clone https://github.com/tuUsuario/syntapp.git
cd syntapp

# 2. Levanta la base de datos y el backend
docker-compose up --build db backend

# (Opcional) En otra terminal, levanta el frontend cuando esté disponible:
docker-compose up --build frontend
```

- El contenedor **db** inicia PostgreSQL  
- El contenedor **backend** expone la API en http://localhost:4000  
- El contenedor **frontend** (en desarrollo) quedará en http://localhost:3000  

---

🛠️ **Variables de entorno**  
Define estas variables en `backend/.env`:

```
DB_HOST=db
DB_USER=crmuser
DB_PASSWORD=crmpass
DB_NAME=crmdb
DB_PORT=5432
PORT=4000
```

---

📂 **Estructura de carpetas**

```
syntapp/
├── backend/               # Código del servidor Node.js/Express
│   ├── config/            # Conexión y configuración de Sequelize
│   ├── controllers/       # Lógica de negocio (CRUD)
│   ├── models/            # Definición de esquemas Sequelize
│   ├── routes/            # Rutas Express
│   ├── .env               # Variables de entorno
│   ├── Dockerfile         # Contenedor del backend
│   ├── index.js           # Punto de entrada
│   └── package.json
├── frontend/              # (En desarrollo) React + Tailwind
├── docker-compose.yml     # Orquestación de servicios Docker
└── README.md              # Este archivo
```

---

🔗 **Rutas disponibles**

1. **Bienvenida**  
   - GET `/`  
     Respuesta:  
     ```
     Welcome to Syntapp CRM API
     ```

2. **Health-Check**  
   - GET `/health`  
     Respuesta JSON:
     ```json
     {
       "status":"OK",
       "timestamp":"2025-04-28T...Z"
     }
     ```

3. **Contactos**  
   - GET `/contacts`  
     Lista todos los contactos (inicialmente `[]`).  
   - POST `/contacts`  
     Crea un contacto. Body JSON de ejemplo:
     ```json
     {
       "firstName":"Ana",
       "lastName":"Paz",
       "email":"ana@example.com",
       "phone":"123456789",
       "source":"web",
       "status":"new"
     }
     ```
     Ejemplo con curl:
     ```bash
     curl -X POST http://localhost:4000/contacts        -H "Content-Type: application/json"        -d '{"firstName":"Ana","email":"ana@example.com"}'
     ```

4. **Empresas** *(en desarrollo)*  
   - GET `/companies`  
   - POST `/companies`

5. **Campañas** *(en desarrollo)*  
   - GET `/campaigns`  
   - POST `/campaigns`

---

📈 **Próximos pasos**  
- Completar PUT y DELETE para Contact, Company y Campaign  
- Añadir autenticación y roles de usuario  
- Desarrollar el frontend en React + Tailwind  
- Integrar APIs de WhatsApp (Twilio), Email Marketing y Meta Graph API  

---

📄 **Licencia**  
Este proyecto se distribuye bajo la [MIT License](LICENSE).