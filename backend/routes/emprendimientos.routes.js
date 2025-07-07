const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const emprendimientoController = require('../controllers/emprendimientos.controller');
const db = require('../db/conection');

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
router.get('/detalle/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM emprendimientos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Negocio no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener negocio', error: err });
  }
});

// Ruta para crear un nuevo emprendimiento
router.post('/crear', emprendimientoController.crearEmprendimiento);

// Ruta para obtener emprendimientos por usuario
router.get('/:usuarioId', emprendimientoController.obtenerPorUsuario);

module.exports = router;
router.post('/seguir', async (req, res) => {
  const { usuario_id, emprendimiento_id } = req.body;
  try {
    await db.query('INSERT INTO seguimientos (usuario_id, emprendimiento_id) VALUES (?, ?)', [usuario_id, emprendimiento_id]);
    res.status(200).json({ mensaje: 'Seguido exitosamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al seguir', error: err });
  }
});

router.delete('/dejar-seguir', async (req, res) => {
  const { usuario_id, emprendimiento_id } = req.body;
  try {
    await db.query('DELETE FROM seguimientos WHERE usuario_id = ? AND emprendimiento_id = ?', [usuario_id, emprendimiento_id]);
    res.status(200).json({ mensaje: 'Dejó de seguir' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al dejar de seguir', error: err });
  }
});

router.get('/seguimiento/:usuarioId/:emprendimientoId', async (req, res) => {
  const { usuarioId, emprendimientoId } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM seguimientos WHERE usuario_id = ? AND emprendimiento_id = ?',
      [usuarioId, emprendimientoId]
    );
    res.json({ sigue: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al verificar seguimiento', error: err });
  }
});
