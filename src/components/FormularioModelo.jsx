import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useModelos from '../hooks/useModelos'
import Alerta from './Alerta'

const FormularioModelo = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [telegram, setTelegram] = useState('')
    const [email, setEmail] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, editarModelo, modelo } = useModelos();

    useEffect(() => {
        if( params.id ) {
            setId(modelo._id)
            setNombre(modelo.nombre)
            setEmail(modelo.email)
            setTelegram(modelo.telegram)
        } 
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, telegram].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })

            return
        }

        // Pasar los datos hacia el provider
        await editarModelo({ id, nombre, email, telegram})

        setId(null)
        setNombre("")
        setEmail("")
        setTelegram("")
    }

    const { msg } = alerta

    return (
            <form 
                className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                    {msg && <Alerta alerta={alerta} />}

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="nombre"
                        >Nombre Modelo</label>

                        <input
                            id="nombre"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Nombre del Modelo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="Email"
                        >Email</label>

                        <input
                            id="Email"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-5'>
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="telegram"
                        >Telegram ID Canal</label>

                        <input
                            id="telegram"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                            placeholder="telegram"
                            value={telegram}
                            onChange={e => setTelegram(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value={id ? 'Actualizar Modelo': 'Crear Tarea'}
                        className='bg-pink-200 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                    />
            </form>
    )
}

export default FormularioModelo