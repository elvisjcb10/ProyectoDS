const publicacionesModel = require('../models/publicaciones.model');

const crearPublicacion = async (req, res) => {
  try {
    const { titulo, contenido, imagen, fecha, emprendimiento_id } = req.body;
    await publicacionesModel.crear({ titulo, contenido, imagen, fecha, emprendimiento_id });
    res.status(201).json({ mensaje: 'Publicación creada' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear publicación', error: err });
  }
};

const obtenerPorEmprendimiento = async (req, res) => {
  const { emprendimiento_id } = req.params;
  try {
    const publicaciones = await publicacionesModel.obtenerPorEmprendimiento(emprendimiento_id);
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener publicaciones', error: err });
  }
};

module.exports = {
  crearPublicacion,
  obtenerPorEmprendimiento
};
