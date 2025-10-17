const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const alumnoRoutes = require('./routes/alumnoRoutes');

// Usar rutas
app.use('/api/alumnos', alumnoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
