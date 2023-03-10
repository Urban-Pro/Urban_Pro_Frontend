import { useEffect } from 'react'
import useModelos from "../hooks/useModelos"
import PreviewModelos from "./PreviewModelos"
import Alerta from "./Alerta"
import useAuth from '../hooks/useAuth'

const Modelos = () => {
  const { auth } = useAuth()
  const { email } = auth
  const { modelos, alerta } = useModelos()
  const { msg } = alerta

  return (
    <>
        {email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com' ?
        <h1 className="text-4xl font-black">Editar Modelos</h1> : <h1 className="text-4xl font-black">Proyectos en Curso</h1>}
        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg ">
            {modelos.length ? 
              modelos.map(proyecto => (
                  <PreviewModelos 
                      key={proyecto._id}
                      proyecto={proyecto}
                  />
              ))
            : <p className=" text-center text-gray-600 uppercase  p-5">No hay nada aún</p>}
        </div>
    </>
  )
}

export default Modelos