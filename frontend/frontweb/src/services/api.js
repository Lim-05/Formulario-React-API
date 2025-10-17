import axios from 'axios';

const API_URL = 'http://localhost:3000/api/alumnos';

// Obtener todos los alumnos
export const obtenerAlumnos = async () => {
  return await axios.get(API_URL);
};

// Agregar un nuevo alumno
export const agregarAlumno = async (nuevoAlumno) => {
  return await axios.post(API_URL, nuevoAlumno);
};

// Actualizar alumno existente
export const actualizarAlumno = async (id, alumnoActualizado) => {
  return await axios.put(`${API_URL}/${id}`, alumnoActualizado);
};

// Eliminar alumno
export const eliminarAlumno = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
