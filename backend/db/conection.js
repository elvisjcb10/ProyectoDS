// db/connection.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0548',
  database: 'emprendimientos_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/* Intento de conexión para comprobar que el pool está listo */
(async () => {
  try {
    const conn = await pool.getConnection();   // pedimos una conexión
    console.log('Conectado a MySQL');        // mensaje de éxito
    conn.release();                             // la devolvemos al pool
  } catch (err) {
    console.error('Error al conectar a MySQL:', err.message);
    /* Si quieres abortar la app en caso de fallo, descomenta:
       process.exit(1);
    */
  }
})();

module.exports = pool;
