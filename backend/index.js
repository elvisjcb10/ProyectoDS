const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuario.routes');



app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
