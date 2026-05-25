const db = require('../database');

const Inmueble = {

    getAll: (callback) => {
        const sql = 'SELECT * FROM inmuebles';
        db.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM inmuebles WHERE id = ?';
        db.query(sql, [id], callback);
    },

    create: (data, callback) => {
        const sql = `
            INSERT INTO inmuebles
            (titulo, descripcion, precio, tipo, ciudad)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            data.titulo,
            data.descripcion,
            data.precio,
            data.tipo,
            data.ciudad
        ], callback);
    },

    update: (id, data, callback) => {
        const sql = `
            UPDATE inmuebles
            SET titulo=?, descripcion=?, precio=?, tipo=?, ciudad=?
            WHERE id=?
        `;

        db.query(sql, [
            data.titulo,
            data.descripcion,
            data.precio,
            data.tipo,
            data.ciudad,
            id
        ], callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM inmuebles WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Inmueble;