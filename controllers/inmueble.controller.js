const Inmueble = require('../models/inmueble.model');

exports.getAll = (req, res) => {
    Inmueble.getAll((err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    Inmueble.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results[0]);
    });
};

exports.create = (req, res) => {
    Inmueble.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Inmueble creado',
            id: result.insertId
        });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;

    Inmueble.update(id, req.body, (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Inmueble actualizado'
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Inmueble.delete(id, (err) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Inmueble eliminado'
        });
    });
};