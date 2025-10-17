function ListaAlumnos({ alumnos, onEditar, onEliminar }) {
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

  return (
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
              <button style={btnStyle} onClick={() => onEditar(alumno)}>Editar</button>
              <button
                style={{ ...btnStyle, backgroundColor: "#dc3545" }}
                onClick={() => onEliminar(alumno.id_alumno)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaAlumnos;
