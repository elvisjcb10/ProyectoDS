const clienteModel = require('../models/usuario.model');

exports.crearUsuario = async (req, res) => {
  try {
    await clienteModel.crearUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};
exports.getUsuarioPorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await clienteModel.getUsuarioPorEmail(email);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en getUsuarioPorEmail:', error); // 👈 IMPORTANTE
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};



