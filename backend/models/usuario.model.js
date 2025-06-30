const db = require('../db/conection');
const bcrypt = require('bcrypt');

const crearUsuario = async ({ nombre, correo, contrasena, tipo = 'cliente', fecha_registro }) => {
  const hash = await bcrypt.hash(contrasena, 10);

  await db.query(
  `INSERT INTO usuarios (nombre, correo, contrasena, tipo)
   VALUES (?, ?, ?, ?)`,
  [nombre, correo, hash, tipo]
);
// Obtener todos los clientes
const obtenerClientes = async () => {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
};
};
const getUsuarioPorEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getUsuarioPorEmail,
  crearUsuario
};
