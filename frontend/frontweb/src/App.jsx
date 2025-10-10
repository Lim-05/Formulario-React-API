import { useState, useEffect } from 'react';
import './App.css';
import FormularioAlumno from './components/FormularioAlumno';

function App() {
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoEdit, setAlumnoEdit] = useState(null);

  const API_URL = 'http://localhost:3000/api/alumnos';

  // Obtenerlos alumnos 
  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAlumnos(data);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
    }
  };

  // Agregar o actualizar
  const agregarAlumno = async (nuevoAlumno) => {
    try {
      if (alumnoEdit) {
        // Modo edición
        const res = await fetch(`${API_URL}/${alumnoEdit.id_alumno}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoAlumno),
        });
        if (!res.ok) throw new Error('Error al actualizar alumno');
      } else {
        // Nuevo registro
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoAlumno),
        });
        if (!res.ok) throw new Error('Error al registrar alumno');
      }

      setAlumnoEdit(null);
      obtenerAlumnos(); // Recargar lista
    } catch (error) {
      console.error(error.message);
    }
  };

  // Editar alumno
  const editarAlumno = (alumno) => {
    setAlumnoEdit(alumno);
  };

  //Eliminar alumno
  const eliminarAlumno = async (id_alumno) => {
    if (!window.confirm('¿Seguro que quieres eliminar este alumno?')) return;
    try {
      const res = await fetch(`${API_URL}/${id_alumno}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar alumno');
      obtenerAlumnos();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Registro de Alumnos</h1>

      <FormularioAlumno
        agregarAlumno={agregarAlumno}
        alumnoEdit={alumnoEdit}
        cancelarEdicion={() => setAlumnoEdit(null)}
      />

      <h2>Lista de Alumnos Registrados</h2>
      {alumnos.length === 0 ? (
        <p>No hay alumnos registrados.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Curso</th>
              <th style={thStyle}>Sexo</th>
              <th style={thStyle}>Habla Inglés</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id_alumno}>
                <td style={tdStyle}>{alumno.nombre_alumno}</td>
                <td style={tdStyle}>{alumno.email_alumno}</td>
                <td style={tdStyle}>{alumno.curso_alumno}</td>
                <td style={tdStyle}>{alumno.sexo_alumno}</td>
                <td style={tdStyle}>{alumno.habla_ingles ? "Sí" : "No"}</td>
                <td style={tdStyle}>
                  <button style={btnStyle} onClick={() => editarAlumno(alumno)}>Editar</button>
                  <button
                    style={{ ...btnStyle, backgroundColor: "#dc3545" }}
                    onClick={() => eliminarAlumno(alumno.id_alumno)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = { border: "1px solid #ccc", padding: "8px", backgroundColor: "#007BFF", color: "#fff" };
const tdStyle = { border: "1px solid #ccc", padding: "8px" };
const btnStyle = {
  marginRight: "5px",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#007BFF",
  color: "#fff"
};

export default App;
