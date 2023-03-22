import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

const ModelosContext = createContext();

const ModelosProvider = ({children}) => {

    const [modelos, setModelos] = useState([]);
    const [modelo, setModelo] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerModelos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/modelos', config)
                setModelos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerModelos()
    }, [auth])

    const editarModelo = async modelo => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/modelos/${modelo.id}`, modelo, config)

            // Sincronizar el state
            const modelosActualizados = modelos.map(modeloState => modeloState._id === data._id ? data : modeloState)
            setModelos(modelosActualizados)

            setAlerta({
                msg: 'Modelo Actualizada Correctamente',
                error: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerModelo = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/modelos/${id}`, config )
            setModelo(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos/editar-modelos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarModelo = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const data = await clienteAxios.delete(`/modelos/${id}`, config)
            console.log(data)

            // Sincronizar el state
            const modelosActualizados = modelos.filter(modeloState => modeloState._id !== id )
            setModelos(modelosActualizados)

            setAlerta({
                msg: data.data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos/editar-modelos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

return (
    <ModelosContext.Provider
        value={{
            modelos,
            modelo,
            alerta,
            cargando,
            mostrarAlerta,
            editarModelo,
            eliminarModelo,
            obtenerModelo
        }}
    >{children}
    </ModelosContext.Provider>
)
}
export { 
ModelosProvider
}

export default ModelosContext