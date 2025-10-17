const Alumno = require('../models/alumnoModel');

exports.obtenerTodos = (req, res) => {
  Alumno.obtenerTodos((err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener los alumnos', error: err.message });
    res.json(results);
  });
};

exports.obtenerPorId = (req, res) => {
  const { id_alumno } = req.params;
  Alumno.obtenerPorId(id_alumno, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener el alumno', error: err.message });
    if (results.length === 0) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    res.json(results[0]);
  });
};

exports.crear = (req, res) => {
  const datos = req.body;

  if (!datos.nombre_alumno || !datos.email_alumno || !datos.curso_alumno || !datos.sexo_alumno || datos.habla_ingles === undefined) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  Alumno.crear(datos, (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ mensaje: 'El email ya existe' });
      }
      return res.status(500).json({ mensaje: 'Error al crear el alumno', error: err.message });
    }
    res.status(201).json({ id_alumno: results.insertId });
  });
};

exports.actualizar = (req, res) => {
  const { id_alumno } = req.params;
  const datos = req.body;

  Alumno.actualizar(id_alumno, datos, (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al actualizar alumno', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno actualizado correctamente' });
  });
};

exports.eliminar = (req, res) => {
  const { id_alumno } = req.params;

  Alumno.eliminar(id_alumno, (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar alumno', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    res.json({ mensaje: 'Alumno eliminado correctamente' });
  });
};
