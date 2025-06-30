const express = require('express');
const cors = require('cors');
const app = express();

const usuariosRoutes = require('./routes/usuario.routes');
const emprendimientosRoutes = require('./routes/emprendimientos.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/emprendimientos', emprendimientosRoutes);

// Carpeta pública para imágenes subidas
app.use('/uploads', express.static('uploads'));

// Servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
