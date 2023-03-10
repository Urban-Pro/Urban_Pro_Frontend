import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

const ModelosContext = createContext();

const ModelosProvider = ({children}) => {
    console.log("ModelosP")

    const [modelos, setModelos] = useState([]);
    const [alerta, setAlerta] = useState({});

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
                const { data } = await clienteAxios('/modelos', config)
                setModelos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerModelos()
    }, [auth])

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
            alerta
        }}
    >{children}
    </ModelosContext.Provider>
)
}
export { 
ModelosProvider
}

export default ModelosContext