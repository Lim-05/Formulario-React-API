const db = require('../config/db');

const Alumno = {
  obtenerTodos: (callback) => {
    const sql = 'SELECT * FROM alumnos';
    db.query(sql, callback);
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM alumnos WHERE id_alumno = ?';
    db.query(sql, [id], callback);
  },

  crear: (datos, callback) => {
    const sql = 'INSERT INTO alumnos (nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles) VALUES (?, ?, ?, ?, ?)';
    const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = datos;
    db.query(sql, [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles], callback);
  },

  actualizar: (id, datos, callback) => {
    const sql = `
      UPDATE alumnos 
      SET nombre_alumno = ?, email_alumno = ?, curso_alumno = ?, sexo_alumno = ?, habla_ingles = ?
      WHERE id_alumno = ?
    `;
    const { nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles } = datos;
    db.query(sql, [nombre_alumno, email_alumno, curso_alumno, sexo_alumno, habla_ingles, id], callback);
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM alumnos WHERE id_alumno = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Alumno;
