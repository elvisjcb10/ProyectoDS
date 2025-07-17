const db = require('../db/conection');


const crearEmprendimiento = async ({ nombre, descripcion, imagen, telefono, ubicacion, usuario_id }) => {
  await db.query(`
    INSERT INTO emprendimientos (nombre, descripcion, imagen, telefono, ubicacion, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `, [nombre, descripcion, imagen, telefono, ubicacion, usuario_id]);
};

module.exports = {
  crearEmprendimiento,
};

