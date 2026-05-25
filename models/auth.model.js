const db = require('../database');

const Usuario = {

    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';

        db.query(sql, [email], callback);
    },

    create: (data, callback) => {
        const sql = `
            INSERT INTO usuarios
            (nombre, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [
            data.nombre,
            data.email,
            data.password
        ], callback);
    }

};

module.exports = Usuario;