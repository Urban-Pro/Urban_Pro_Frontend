import React, { useState, useEffect } from "react";
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const FormularioArchivo = () => {
  const { auth } = useAuth();
  const { telegram, nombre, email } = auth;
  const [archivos, setArchivos] = useState(null);
  const [percentCounter, setPercentCounter] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    const termsAgreed = window.confirm(`¿Acepta los términos y condiciones de Urban Pro?`);
    if (!termsAgreed) {
      return;
    }
    e.preventDefault();

    if (!archivos || archivos.length === 0) {
      setError("Por favor, seleccione al menos un archivo");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
      formData.append(`archivos`, archivos[i]);
    }
    formData.append("telegram", telegram);
    formData.append("nombre", nombre);
    formData.append("email", email);

    try {
      await clienteAxios.post("/upload/files", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setPercentCounter(`Progreso: ${Math.round(percent)}%`);
        },
      });
      setPercentCounter(null);
      setArchivos(null); // Reinicia el valor de archivos después de cargarlos correctamente
      setSuccess("Archivos cargados correctamente");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      setError(null);
    } catch (error) {
      try {
        const range = document.createRange();
        range.selectNodeContents(preElement);
      
        const errorText = range.toString();
        const eM = errorText.split("at")[0];
      
        if (eM == "Internal Server Error") {
          setError("jpeg|jpg|png|gif|mp4|avi|wmv|mov|\nFormatos permitidos.");
        } else {
          setError(eM);
        }
      } catch (error) {
        console.error(error);
        setError("Error al seleccionar el contenido del elemento");
      }
      
      setPercentCounter(null);
      setArchivos(null); // Reinicia el valor de archivos después de cargarlos correctamente
      setTimeout(() => {
        setError(null);
      }, 3000);
      setSuccess(null);
    }
  };

  const handleFileChange = (e) => {
    setArchivos(e.target.files);
    setError(null);
    setSuccess(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {archivos && (
        <div className="flex flex-col mb-3">
          {percentCounter == null ? null : percentCounter}
        </div>
      )}
      <div className="mb-3 flex flex-row w-min items-center">
        <div className="flex flex-col">          
          <label htmlFor="archivos" className="form-label font-normal text-mdx">
            Seleccione uno o varios archivos:
          </label>
          <input
            type="file"
            className=" w-[200px] p-2 "
            id="archivos"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cargar archivos
          </button>
        </div>
      </div>
      <div className="flex items-center font-semibold">        
        {error && <div className="text-red-500 mb-3">{error}</div>}
        {success && <div className="text-green-500 mb-3">{success}</div>}
      </div>
</form>
  );
};

export default FormularioArchivo;
