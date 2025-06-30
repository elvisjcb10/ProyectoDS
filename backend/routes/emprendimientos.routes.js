const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const emprendimientoController = require('../controllers/emprendimientos.controller');

// Configurar multer para guardar archivos en /uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  },
});
const upload = multer({ storage });

// Ruta para subir imagen
router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) return res.status(400).json({ mensaje: 'No se recibió archivo' });

  const url = `http://localhost:3001/uploads/${req.file.filename}`;
  res.json({ url });
});

// Ruta para crear un nuevo emprendimiento
router.post('/crear', emprendimientoController.crearEmprendimiento);

// Ruta para obtener emprendimientos por usuario
router.get('/:usuarioId', emprendimientoController.obtenerPorUsuario);

module.exports = router;
