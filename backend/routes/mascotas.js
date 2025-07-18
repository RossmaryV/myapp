const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obtener todas las mascotas con nombre de dueño
router.get('/', (req, res) => {
  const sql = `
    SELECT mascotas.*, duenos.nombre AS nombre_dueno
    FROM mascotas
    LEFT JOIN duenos ON mascotas.duenio_id = duenos.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener una mascota por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT mascotas.*, duenos.nombre AS nombre_dueno
    FROM mascotas
    LEFT JOIN duenos ON mascotas.duenio_id = duenos.id
    WHERE mascotas.id = ?
  `;
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json(row);
  });
});

// Crear nueva mascota
router.post('/', (req, res) => {
  const { nombre, tipo, edad, duenio_id } = req.body;
  if (!nombre || !duenio_id) return res.status(400).json({ error: 'Faltan datos obligatorios' });

  const sql = `
    INSERT INTO mascotas (nombre, tipo, edad, duenio_id)
    VALUES (?, ?, ?, ?)
  `;
  db.run(sql, [nombre, tipo, edad, duenio_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nombre, tipo, edad, duenio_id });
  });
});

// Actualizar mascota
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, tipo, edad, duenio_id } = req.body;

  const sql = `
    UPDATE mascotas SET nombre = ?, tipo = ?, edad = ?, duenio_id = ?
    WHERE id = ?
  `;
  db.run(sql, [nombre, tipo, edad, duenio_id, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json({ id, nombre, tipo, edad, duenio_id });
  });
});

// Eliminar mascota
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM mascotas WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.json({ message: 'Mascota eliminada correctamente' });
  });
});

module.exports = router;
