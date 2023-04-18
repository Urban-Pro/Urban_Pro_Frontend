import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { uploadFile } from "../services/firebaseService";
import clienteAxios from '../config/clienteAxios'

const FormularioArchivo = () => {
  const { auth } = useAuth();
  const { telegram, nombre, email } = auth;
  const [archivos, setArchivos] = useState(null);
  const [percentCounter, setPercentCounter] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleSubmit = async (e) => {
    const termsAgreed = window.confirm(
      `¿Acepta los términos y condiciones de Urban Pro?`
    );
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
    try {
      const files = Array.from(archivos);
      setUploadedCount(0);
      const urlsTemp = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const snapshot = await uploadFile(file, email, (progress) => {
          const percent = (progress.bytesTransferred / progress.totalBytes) * 100;
          setPercentCounter(`Progreso: ${Math.round(percent)}%`);
        });
        if (snapshot) {
          const url = await snapshot.downloadURL;
          urlsTemp.push(url);
          setUploadedCount((prevCount) => prevCount + 1);
          setError("♥♥♥ Subiendo Exitosamente !! ♥♥♥");
        } else {
          console.error("Error al subir el archivo:");
        }
      }
      setPercentCounter(null);
      setArchivos(null);
      setSuccess("Archivos cargados correctamente");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      setError(null);

      // Enviar links de archivos subidos por correo electrónico
      const links = urlsTemp.join(`,<br>`);
      const message = `Se han subido los siguientes archivos:<br><br>${links}`;
      const data = JSON.stringify({
        to: "urbanproapp@outlook.com",
        subject: "Archivos subidos",
        message: message,
        email,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await clienteAxios.post(`/upurl/upload`, data, config);
      console.log(JSON.stringify(response.data, "test"));
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setError("Ocurrió un error al subir el archivo");
    }
  };

  const handleFileChange = (e) => {
    setArchivos(e.target.files);
    setError(null);
    setSuccess(null);
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
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
            multiple // Agregamos el atributo multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white flex justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cargar archivos
          </button>
          <div className="text-blue-500 flex ">
            {uploadedCount} Archivos Subidos
          </div>
        </div>
      </div>
      <div className="flex items-center font-semibold">
        <div>          
          {error && <div className="text-red-500 mb-3">{error}</div>}
          {success && <div className="text-green-500 mb-3">{success}</div>}
        </div>
      </div>
    </form>
  );
};

export default FormularioArchivo;