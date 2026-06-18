const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/auth.model');

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ mensaje: 'nombre, email y password son requeridos' });
        }

        Usuario.findByEmail(email, async (err, results) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            if (results.length > 0) {
                return res.status(400).json({ mensaje: 'El usuario ya existe' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            Usuario.create({ nombre, email, password: hashedPassword }, (err, result) => {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al registrar usuario' });
                }

                res.status(201).json({
                    mensaje: 'Usuario registrado exitosamente',
                    id: result.insertId
                });
            });
        });
    } catch {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: 'email y password son requeridos' });
        }

        Usuario.findByEmail(email, async (err, results) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error interno del servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }

            const usuario = results[0];
            const passwordMatch = await bcrypt.compare(password, usuario.password);

            if (!passwordMatch) {
                return res.status(401).json({ mensaje: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                mensaje: 'Login exitoso',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            });
        });
    } catch {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
