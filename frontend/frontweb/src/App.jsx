import { useState, useEffect } from 'react';
import './App.css';
import FormularioAlumno from './components/FormularioAlumno';
import ListaAlumnos from './components/ListaAlumnos';
import {
  obtenerAlumnos,
  agregarAlumno,
  actualizarAlumno,
  eliminarAlumno
} from './services/api';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEdit, setAlumnoEdit] = useState(null);

  // Obtener alumnos al iniciar
  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = async () => {
    try {
      const res = await obtenerAlumnos();
      setAlumnos(res.data);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
    }
  };

  // Agregar o actualizar alumno
  const manejarGuardar = async (alumno) => {
    try {
      if (alumnoEdit) {
        await actualizarAlumno(alumnoEdit.id_alumno, alumno);
      } else {
        await agregarAlumno(alumno);
      }
      setAlumnoEdit(null);
      cargarAlumnos();
    } catch (error) {
      console.error('Error al guardar alumno:', error);
    }
  };

  // Eliminar alumno
  const manejarEliminar = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este alumno?')) return;
    try {
      await eliminarAlumno(id);
      cargarAlumnos();
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Registro de Alumnos</h1>

      <FormularioAlumno
        agregarAlumno={manejarGuardar}
        alumnoEdit={alumnoEdit}
        cancelarEdicion={() => setAlumnoEdit(null)}
      />

      <h2>Lista de Alumnos Registrados</h2>
      {alumnos.length === 0 ? (
        <p>No hay alumnos registrados.</p>
      ) : (
        <ListaAlumnos
          alumnos={alumnos}
          onEditar={setAlumnoEdit}
          onEliminar={manejarEliminar}
        />
      )}
    </div>
  );
}

export default App;
