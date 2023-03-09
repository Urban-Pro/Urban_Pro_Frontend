import React, { useState } from "react";
import clienteAxios from '../config/clienteAxios'

const FormularioArchivo = () => {
  const [archivos, setArchivo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append("archivos", archivos[i]);
    }
    try {
      await clienteAxios.post("/upload", formData);
      alert("Archivos cargados correctamente");
    } catch (error) {
      alert("Error al cargar los archivos");
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
        multiple
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Cargar archivos
      </button>
    </form>
  );
};

export default FormularioArchivo;
