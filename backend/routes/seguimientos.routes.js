const express = require('express');
const router = express.Router();
const db = require('../db/conection');
// backend/routes/seguimientos.routes.js
router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [empresas] = await db.query(`
      SELECT 
        e.id, e.nombre, e.descripcion, e.imagen, e.telefono, e.ubicacion
      FROM seguimientos s
      INNER JOIN emprendimientos e ON s.emprendimiento_id = e.id
      WHERE s.usuario_id = ?
    `, [usuarioId]);

    res.json(empresas);
  } catch (err) {
    console.error("Error al obtener empresas seguidas:", err);
    res.status(500).json({ error: "Error al obtener empresas seguidas" });
  }
});
module.exports = router;
