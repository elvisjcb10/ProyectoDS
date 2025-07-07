const db = require('../db/conection');

const crear = async ({ titulo, contenido, imagen, fecha, emprendimiento_id }) => {
  const sql = `
    INSERT INTO publicaciones (titulo, contenido, imagen, fecha, emprendimiento_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(sql, [titulo, contenido, imagen, fecha, emprendimiento_id]);
  return result;
};

const obtenerPorEmprendimiento = async (emprendimiento_id) => {
  const [rows] = await db.query(
    'SELECT * FROM publicaciones WHERE emprendimiento_id = ? ORDER BY fecha DESC',
    [emprendimiento_id]
  );
  return rows;
};

module.exports = {
  crear,
  obtenerPorEmprendimiento
};
