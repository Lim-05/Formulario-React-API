const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '12345',
    database: process.env.DB_NAME || 'alumnos'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexion a MySQL: ', err);
        return; 
    }
    console.log('Conectado a MySQL');
});

// Crear tabla si no existe

// RUTAS (CRUD)

// GET - Obtener todos los alumnos
app.get('/api/alumnos', (req, res) => {
    const sql = 'SELECT * FROM alumnos';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
            mensaje: 'Error al obtener los alumnos',
            error: err.message 
        });
        }
        res.json(results);
    });
});

// GET - Obtener un alumno por ID
app.get('/api/alumnos/:id_alumno', (req, res) => {
    const sql = 'SELECT * FROM alumnos WHERE id_alumno = ?';

    db.query(sql, [req.params.id_alumno], (err, results) => {
        if (err) {
            return res.status(500).json({
            mensaje: 'Error al obtener el alumno',
            error: err.message 
        });
        }
        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
        res.json(results[0]);
    });
});   

// POST - Crear un nuevo alumno
app.post('/api/alumnos', (req, res) => {
    const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = req.body;

    // Validar datos
    if (!nombre_alumno || !email_alumno || !curso_alumno || !sexo_alumno || habla_ingles === undefined) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const sql = 'INSERT INTO alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES (?, ?, ?, ?, ?)';
   
    db.query(sql, [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ 
                mensaje: 'El email ya existe' 
            });
        }
        return res.status(500).json({
            mensaje: 'Error al crear el alumno',
            error: err.message 
        });
        }
        res.status(201).json({ 
            id_alumno: results.insertId,
        });
    });
});

// PUT - Actualizar alumno por ID
app.put('/api/alumnos/:id_alumno', (req, res) => {
  const { id_alumno} = req.params;
  const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = req.body;

  const sql = `
    UPDATE alumnos 
    SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ?, sexo_alumno = ?, habla_ingles = ?
    WHERE id_alumno = ?
  `;

  db.query(sql, [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id_alumno], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar alumno', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno actualizado correctamente' });
  });
});

// DELETE - Eliminar alumno por ID
app.delete('/api/alumnos/:id_alumno', (req, res) => {
  const { id_alumno } = req.params;
  const sql = 'DELETE FROM alumnos WHERE id_alumno = ?';

  db.query(sql, [id_alumno], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar alumno', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});