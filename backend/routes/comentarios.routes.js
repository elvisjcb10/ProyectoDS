const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db/conection');

// Crear comentario
router.post('/crear', async (req, res) => {
  const { mensaje, fecha, usuario_id, publicacion_id } = req.body;

  try {
    const mysqlFecha = new Date(fecha).toISOString().slice(0, 19).replace('T', ' ');

    await db.query(`
      INSERT INTO comentarios (mensaje, fecha, usuario_id, publicacion_id)
      VALUES (?, ?, ?, ?)
`, [mensaje, mysqlFecha, usuario_id, publicacion_id]);
    res.status(201).json({ mensaje: 'Comentario creado' });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear comentario' });
  }
});
router.get('/:emprendimientoId', async (req, res) => {
  const { emprendimientoId } = req.params;

  try {
    const [comentarios] = await db.query(`
      SELECT c.id, c.mensaje, c.fecha, c.usuario_id, c.publicacion_id, u.nombre AS usuario_nombre
      FROM comentarios c
      INNER JOIN publicaciones p ON c.publicacion_id = p.id
      INNER JOIN usuarios u ON c.usuario_id = u.id
      WHERE p.emprendimiento_id = ?
      ORDER BY c.fecha ASC
    `, [emprendimientoId]);

    res.json(comentarios);
  } catch (err) {
    console.error('Error al obtener comentarios:', err);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});
// Dar like
router.post('/dar', async (req, res) => {
  const { usuario_id, publicacion_id } = req.body;

  try {
    // Verificar si ya dio like
    const [existente] = await db.query(`
      SELECT * FROM likes WHERE usuario_id = ? AND publicacion_id = ?
    `, [usuario_id, publicacion_id]);

    if (existente.length > 0) {
      return res.status(400).json({ mensaje: 'Ya diste like' });
    }

    await db.query(`
      INSERT INTO likes (usuario_id, publicacion_id) VALUES (?, ?)
    `, [usuario_id, publicacion_id]);

    res.status(201).json({ mensaje: 'Like registrado' });
  } catch (err) {
    console.error('Error al dar like:', err);
    res.status(500).json({ error: 'Error al dar like' });
  }
});

module.exports = router;
