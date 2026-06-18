const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err.message);
    } else {
        console.log('MySQL conectado');
        connection.release();
    }
});

module.exports = pool;