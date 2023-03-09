import React, { useState } from "react";
import clienteAxios from '../config/clienteAxios'

const FormularioArchivo = () => {
  const [archivos, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("archivos", archivos);
    try {
      await clienteAxios.post("/upload", formData);
      alert("Archivo cargado correctamente");
    } catch (error) {
      alert("Error al cargar el archivos");
    }
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="archivos" className="form-label">
          Seleccione los archivos:
        </label>
        <input
          type="file"
          className="form-control"
          id="archivos"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Cargar archivos
      </button>
    </form>
  );
};

export default FormularioArchivo;
