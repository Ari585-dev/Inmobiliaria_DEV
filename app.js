const express = require('express');
const app = express();

const inmuebleRoutes = require('./routes/inmuebles.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/api', inmuebleRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});