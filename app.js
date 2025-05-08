require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const filmeRoutes = require('./src/routes/filmeRoutes');
const administradorRoutes = require('./src/routes/administradorRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use('/api', filmeRoutes);
app.use('/api', administradorRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});