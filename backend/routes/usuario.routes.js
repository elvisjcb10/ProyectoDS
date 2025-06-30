const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Ruta POST para registrar
router.post('/registrar', usuarioController.crearUsuario);

// Ruta GET para obtener usuario por email
// ❌ Quita '/api/usuarios' porque ya se agregó en index.js
router.get('/:email', usuarioController.getUsuarioPorEmail);

module.exports = router;
