const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const usuariosRoutes = require('./routes/usuario.routes');
const emprendimientosRoutes = require('./routes/emprendimientos.routes');
const publicacionesRoutes = require('./routes/publicaciones.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
const likesRoutes = require('./routes/likes.routes');
const seguimientosRoutes = require('./routes/seguimientos.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/emprendimientos', emprendimientosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/seguimientos', seguimientosRoutes);

// Carpeta pública para imágenes subidas
app.use('/uploads', express.static('uploads'));

// Servidor (última línea)
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
