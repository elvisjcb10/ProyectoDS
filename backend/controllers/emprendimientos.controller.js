// backend/controllers/emprendimiento.controller.js
const db = require('../db/conection');
const model = require('../models/emprendimientos.model');

exports.crearEmprendimiento = async (req, res) => {
  try {
    await model.crearEmprendimiento(req.body);
    res.status(201).json({ mensaje: 'Emprendimiento registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar emprendimiento:', error);
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

exports.obtenerPorUsuario = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM emprendimientos WHERE usuario_id = ?', [usuarioId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener emprendimientos', error });
  }
};
