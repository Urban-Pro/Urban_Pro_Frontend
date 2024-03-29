import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'
import Busqueda from './Busqueda'

const Header = () => {

    const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    const { cerrarSesionAuth, auth } = useAuth()
    const { email } = auth

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }


  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-pink-300 font-black text-center mb-5 md:mb-0">
                Urban Pro App
            </h2>

            <div className='flex flex-col md:flex-row items-center gap-4'>
                {
                email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com'  ?
                <button
                type="button"
                className='font-bold uppercase'
                onClick={handleBuscador}
                >Buscar Modelo</button>
                :
                null
                }
                
                
                {
                email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com' ?
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >Proyectos</Link>
                :
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >Proyectos</Link>
                }

                <button
                    type="button"
                    className='text-white text-sm bg-pink-200 p-3 rounded-md uppercase font-bold'
                    onClick={handleCerrarSesion}
                >Cerrar Sesión</button>

                {
                email == 'urbanproapp@outlook.com' || email == 'santiagomuzik@gmail.com' ?
                <Busqueda />
                :
                null
                }
            </div>
        </div>
    </header>
  )
}

export default Header