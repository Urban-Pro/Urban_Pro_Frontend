import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {

  const { auth } = useAuth()
  const { email } = auth

  return (
    email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com' ?
    
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10' >
      <p className='text-xl font-bold'>Hola: {auth.nombre}</p>

      <Link
        to="crear-proyecto"
        className='bg-pink-200 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
      >
        Nuevo Proyecto
      </Link>
      <Link
        to="editar-modelos"
        className='bg-pink-200 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
      >
        Editar Modelos
      </Link>
    </aside>
    :
    null
  )
}

export default Sidebar
