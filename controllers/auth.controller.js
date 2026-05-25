const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/auth.model');

exports.register = async (req, res) => {

    try {

        const { nombre, email, password } = req.body;

        Usuario.findByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length > 0) {
                return res.status(400).json({
                    mensaje: 'El usuario ya existe'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            Usuario.create({
                nombre,
                email,
                password: hashedPassword
            }, (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    mensaje: 'Usuario registrado',
                    id: result.insertId
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error del servidor',
            error
        });

    }

};

exports.login = (req, res) => {

    try {

        const { email, password } = req.body;

        Usuario.findByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(404).json({
                    mensaje: 'Usuario no encontrado'
                });
            }

            const usuario = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                usuario.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    mensaje: 'Contraseña incorrecta'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            res.json({
                mensaje: 'Login exitoso'
            });

        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error del servidor',
            error
        });

    }

};