const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
});

connection.connect((err) => {
    if (err) {
        console.log('Error de conexión:', err);
    } else {
        console.log('MySQL conectado');
    }
});

module.exports = connection;