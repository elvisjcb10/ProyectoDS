const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db/conection');

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Subir imagen
router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) return res.status(400).json({ mensaje: 'No se recibió archivo' });
  const url = `http://localhost:3001/uploads/${req.file.filename}`;
  res.json({ url });
});

// Crear publicación
router.post('/crear', async (req, res) => {
  const { titulo, contenido, fecha, imagen, emprendimiento_id } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO publicaciones (titulo, contenido, fecha, emprendimiento_id)
      VALUES (?, ?, ?, ?)
    `, [titulo, contenido, fecha, emprendimiento_id]);

    const publicacion_id = result.insertId;

    if (imagen && imagen.trim() !== '') {
      await db.query(`
        INSERT INTO imagenes (url, publicacion_id)
        VALUES (?, ?)
      `, [imagen, publicacion_id]);
    }

    res.status(201).json({ mensaje: 'Publicación creada correctamente' });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error al crear publicación' });
  }
});

// GET: Todas las publicaciones con nombre de emprendimiento e imagen
router.get('/todo', async (req, res) => {
  try {
    const [publicaciones] = await db.query(`
      SELECT 
        p.id,
        p.titulo,
        p.contenido,
        i.url AS imagen,
        p.fecha,
        e.nombre AS nombre_emprendimiento,
        e.id AS emprendimiento_id
      FROM publicaciones p
      INNER JOIN emprendimientos e ON p.emprendimiento_id = e.id
      LEFT JOIN imagenes i ON p.id = i.publicacion_id
      ORDER BY p.fecha DESC
    `);
    res.json(publicaciones);
  } catch (err) {
    console.error('Error al obtener todas las publicaciones:', err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});
// Obtener publicaciones por emprendimiento
router.get('/:emprendimientoId', async (req, res) => {
  const { emprendimientoId } = req.params;
  try {
    const [publicaciones] = await db.query(`
      SELECT p.*, i.url AS imagen 
      FROM publicaciones p
      LEFT JOIN imagenes i ON p.id = i.publicacion_id
      WHERE p.emprendimiento_id = ? 
      ORDER BY p.fecha DESC
    `, [emprendimientoId]);
    res.json(publicaciones);
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
});

// Eliminar publicación
router.delete('/eliminar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [pubs] = await db.query('SELECT * FROM publicaciones WHERE id = ?', [id]);
    if (pubs.length === 0) return res.status(404).json({ mensaje: 'Publicación no encontrada' });

    await db.query('DELETE FROM imagenes WHERE publicacion_id = ?', [id]);
    await db.query('DELETE FROM comentarios WHERE publicacion_id = ?', [id]);
    await db.query('DELETE FROM likes WHERE publicacion_id = ?', [id]);
    await db.query('DELETE FROM publicaciones WHERE id = ?', [id]);

    res.status(200).json({ mensaje: 'Publicación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    res.status(500).json({ error: 'Error al eliminar publicación' });
  }
});




module.exports = router; // ✅ Solo UNA VEZ, al final
