import React, { useState } from "react";

const FormularioArchivo = () => {
  const [archivo, setArchivo] = useState(null);
  const [progreso, setProgreso] = useState(0);

  const handleSubmit = (e) => {
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
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("Archivo cargado correctamente");
        } else {
          alert("Error al cargar el archivo");
        }
      }
    };
  
    xhr.open("POST", "/upload");
    xhr.send(formData);
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
      {progreso > 0 && (
        <div className="progress mb-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progreso}%` }}
            aria-valuenow={progreso}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progreso}%
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-primary">
        Cargar archivo
      </button>
    </form>
  );
};

export default FormularioArchivo;
