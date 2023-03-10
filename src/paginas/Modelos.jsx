import { useEffect } from 'react'
import useModelos from "../hooks/useModelos"
import PreviewModelos from "../components/PreviewModelos"
import Alerta from "../components/Alerta"
import useAuth from '../hooks/useAuth'

const Modelos = () => {
  const { auth } = useAuth()
  const { email } = auth
  const { modelos, alerta } = useModelos()
  const { msg } = alerta

  return (
    <>
        {email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com' ?
        <h1 className="text-4xl font-black">Modelos</h1> : <h1 className="text-4xl font-black">Cuentas en Curso</h1>}
        {msg && <Alerta alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg ">
            {modelos.length ? 
              modelos.map(modelo => (
                  <PreviewModelos 
                      key={modelo._id}
                      modelo={modelo}
                  />
              ))
            : <p className=" text-center text-gray-600 uppercase  p-5">No hay nada aún</p>}
        </div>
    </>
  )
}

export default Modelos