import { useEffect } from 'react'
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth'

const Proyectos = () => {
  const { auth } = useAuth()
  const { email } = auth
  const { proyectos, alerta } = useProyectos()
  const { msg } = alerta

  return (
    <>
        {email == "urbanproapp@outlook.com" ?
        <h1 className="text-4xl font-black">Modelos</h1> : <h1 className="text-4xl font-black">Tareas</h1>}
        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg ">
            {proyectos.length ? 
              proyectos.map(proyecto => (
                  <PreviewProyecto 
                      key={proyecto._id}
                      proyecto={proyecto}
                  />
              ))
            : <p className=" text-center text-gray-600 uppercase  p-5">No hay Modelos aún</p>}
        </div>
    </>
  )
}

export default Proyectos