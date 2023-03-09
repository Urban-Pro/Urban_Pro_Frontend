import React, { useState } from "react";
import clienteAxios from "../config/clienteAxios";

const FormularioArchivo = () => {
  const [archivo, setArchivo] = useState(null);
  const [progreso, setProgreso] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("archivo", archivo);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const porcentaje = (event.loaded / event.total) * 100;
        setProgreso(porcentaje.toFixed(0));
      }
    });

    try {
      await clienteAxios.post("/upload", formData);
      alert("Archivo cargado correctamente");
      setProgreso(0);
    } catch (error) {
      alert("Error al cargar el archivo");
      setProgreso(0);
    }
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="archivo" className="form-label">
          Seleccione un archivo:
        </label>
        <input
          type="file"
          className="form-control"
          id="archivo"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-3">
        <progress value={progreso} max="100" />
      </div>
      <button type="submit" className="btn btn-primary">
        Cargar archivo
      </button>
    </form>
  );
};

export default FormularioArchivo;
