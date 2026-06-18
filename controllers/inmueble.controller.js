const Inmueble = require('../models/inmueble.model');

const CAMPOS_REQUERIDOS = ['titulo', 'descripcion', 'precio', 'tipo', 'ciudad'];

exports.getAll = (req, res) => {
    Inmueble.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener inmuebles' });
        }

        res.json(results);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;

    Inmueble.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener el inmueble' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ mensaje: 'Inmueble no encontrado' });
        }

        res.json(results[0]);
    });
};

exports.create = (req, res) => {
    const faltantes = CAMPOS_REQUERIDOS.filter(campo => !req.body[campo]);

    if (faltantes.length > 0) {
        return res.status(400).json({
            mensaje: `Los siguientes campos son requeridos: ${faltantes.join(', ')}`
        });
    }

    Inmueble.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al crear el inmueble' });
        }

        res.status(201).json({
            mensaje: 'Inmueble creado exitosamente',
            id: result.insertId
        });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;

    const faltantes = CAMPOS_REQUERIDOS.filter(campo => !req.body[campo]);

    if (faltantes.length > 0) {
        return res.status(400).json({
            mensaje: `Los siguientes campos son requeridos: ${faltantes.join(', ')}`
        });
    }

    Inmueble.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al verificar el inmueble' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ mensaje: 'Inmueble no encontrado' });
        }

        Inmueble.update(id, req.body, (err) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al actualizar el inmueble' });
            }

            res.json({ mensaje: 'Inmueble actualizado exitosamente' });
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Inmueble.getById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al verificar el inmueble' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ mensaje: 'Inmueble no encontrado' });
        }

        Inmueble.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al eliminar el inmueble' });
            }

            res.json({ mensaje: 'Inmueble eliminado exitosamente' });
        });
    });
};
