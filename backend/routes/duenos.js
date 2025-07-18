const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obtener todos los dueños
router.get('/', (req, res) => {
  db.all('SELECT * FROM duenos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener un dueño por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM duenos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Dueño no encontrado' });
    res.json(row);
  });
});

// Crear un nuevo dueño
router.post('/', (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });

  db.run(
    'INSERT INTO duenos (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)',
    [nombre, email, telefono, direccion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nombre, email, telefono, direccion });
    }
  );
});

// Actualizar un dueño
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, email, telefono, direccion } = req.body;

  db.run(
    'UPDATE duenos SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
    [nombre, email, telefono, direccion, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
      res.json({ id, nombre, email, telefono, direccion });
    }
  );
})
// Eliminar un dueño
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM duenos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Dueño no encontrado' });
    res.json({ message: 'Dueño eliminado correctamente' });
  });
});

module.exports = router;