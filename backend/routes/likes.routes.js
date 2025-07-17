const express = require('express');
const router = express.Router();
const db = require('../db/conection');
// Obtener likes con info completa para el modal
router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [likes] = await db.query(`
      SELECT 
        p.id,
        p.titulo,
        p.contenido,
        p.fecha,
        i.url AS imagen,
        p.emprendimiento_id,
        e.nombre AS nombre_emprendimiento
      FROM likes l
      INNER JOIN publicaciones p ON l.publicacion_id = p.id
      LEFT JOIN imagenes i ON p.id = i.publicacion_id
      INNER JOIN emprendimientos e ON p.emprendimiento_id = e.id
      WHERE l.usuario_id = ?
      ORDER BY p.fecha DESC
    `, [usuarioId]);

    res.json(likes);
  } catch (err) {
    console.error("Error al obtener likes del usuario:", err);
    res.status(500).json({ error: "Error al obtener likes" });
  }
});

// Toggle like (dar o quitar)
router.post('/toggle', async (req, res) => {
  const { usuario_id, publicacion_id } = req.body;

  try {
    const [existeLike] = await db.query(`
      SELECT id FROM likes WHERE usuario_id = ? AND publicacion_id = ?
    `, [usuario_id, publicacion_id]);

    if (existeLike.length > 0) {
      // Ya dio like → quitarlo
      await db.query(`DELETE FROM likes WHERE usuario_id = ? AND publicacion_id = ?`, [usuario_id, publicacion_id]);
      return res.json({ liked: false });
    } else {
      // No dio like → insertarlo
      await db.query(`
        INSERT INTO likes (usuario_id, publicacion_id) VALUES (?, ?)
      `, [usuario_id, publicacion_id]);
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error('Error al hacer toggle de like:', err);
    res.status(500).json({ error: 'Error al hacer toggle de like' });
  }
});

// Obtener likes por emprendimiento
router.get('/:emprendimientoId', async (req, res) => {
  const { emprendimientoId } = req.params;

  try {
    const [likes] = await db.query(`
      SELECT l.id, l.usuario_id, l.publicacion_id
      FROM likes l
      INNER JOIN publicaciones p ON l.publicacion_id = p.id
      WHERE p.emprendimiento_id = ?
    `, [emprendimientoId]);

    res.json(likes);
  } catch (err) {
    console.error('Error al obtener likes:', err);
    res.status(500).json({ error: 'Error al obtener likes' });
  }
});

module.exports = router;
