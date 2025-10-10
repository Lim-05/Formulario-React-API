import { useState, useEffect } from "react";
import './FormularioAlumno.css';

const FormularioAlumno = ({ agregarAlumno, alumnoEdit, cancelarEdicion }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [hablaIngles, setHablaIngles] = useState(false);

  //Cargar datos del alumno a editar
  useEffect(() => {
    if (alumnoEdit) {
      setNombre(alumnoEdit.nombre_alumno);
      setEmail(alumnoEdit.email_alumno);
      setCurso(alumnoEdit.curso_alumno);
      setSexo(alumnoEdit.sexo_alumno);
      setHablaIngles(!!alumnoEdit.habla_ingles);
    } else {
      limpiarFormulario();
    }
  }, [alumnoEdit]);

  const limpiarFormulario = () => {
    setNombre("");
    setEmail("");
    setCurso("");
    setSexo("masculino");
    setHablaIngles(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarAlumno({
      nombre_alumno: nombre,
      email_alumno: email,
      curso_alumno: curso,
      sexo_alumno: sexo,
      habla_ingles: hablaIngles
    });
    limpiarFormulario();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{alumnoEdit ? "Editar Alumno" : "Registro de Alumno"}</h2>

      <div className="mb-3">
        <label className="form-label">Nombre del Alumno</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email del Alumno</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Seleccione el curso</label>
        <select
          className="form-select"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          required
        >
          <option value="">Seleccione el curso</option>
          <option value="ReactJS">ReactJS</option>
          <option value="Python">Python</option>
          <option value="NodeJS">NodeJS</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Sexo del Alumno</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sexo"
            id="masculino"
            value="masculino"
            checked={sexo === "masculino"}
            onChange={(e) => setSexo(e.target.value)}
          />
          <label className="form-check-label" htmlFor="masculino">Masculino</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sexo"
            id="femenino"
            value="femenino"
            checked={sexo === "femenino"}
            onChange={(e) => setSexo(e.target.value)}
          />
          <label className="form-check-label" htmlFor="femenino">Femenino</label>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">¿Habla Inglés?</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={hablaIngles}
            onChange={(e) => setHablaIngles(e.target.checked)}
          />
          <label className="form-check-label">
            {hablaIngles ? "Sí" : "No"}
          </label>
        </div>
      </div>

      <div className="d-grid gap-2 mb-5">
        <button type="submit" className="btn btn-primary">
          {alumnoEdit ? "Guardar Cambios" : "Registrar nuevo Alumno"}
        </button>

        {alumnoEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioAlumno;
