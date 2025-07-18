// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const duenosRoutes = require('./routes/duenos');
const mascotasRoutes = require('./routes/mascotas');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/duenos', duenosRoutes);
app.use('/api/mascotas', mascotasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
