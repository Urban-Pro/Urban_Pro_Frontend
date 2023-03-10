import React, { useState } from "react";
import clienteAxios from '../config/clienteAxios'

const FormularioArchivo = () => {
  const [archivo, setArchivo] = useState(null);
  const [percentCounter, setpercentCounter] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      await clienteAxios.post("/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setpercentCounter(`Progress: ${Math.round(percent)}%`)
        },
      });
      alert("Archivo cargado correctamente");
    } catch (error) {
      console.log("Error uploading file", error);
      alert("Error al cargar el archivo");
    }
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{percentCounter}</div>
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
      <button type="submit" className="btn btn-primary">
        Cargar archivo
      </button>
    </form>
  );
};

export default FormularioArchivo;
