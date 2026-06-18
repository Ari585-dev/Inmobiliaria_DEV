const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const inmuebleRoutes = require('./routes/inmuebles.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/api', inmuebleRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});