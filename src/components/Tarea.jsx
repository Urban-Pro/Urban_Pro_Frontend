import { useState, useEffect } from 'react';
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import FormularioArchivo from '../components/FormularioArchivo';
import useAuth from '../hooks/useAuth'
import NotificationModal from './NotificationModal';

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea, proyecto, turnChange} = useProyectos()
    const { auth } = useAuth();
    const { email, typeAccount } = auth;
    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id, emailCreador, turn} = tarea
    const [timer, setTimer] = useState(null);
    const [diasRestantes, setDiasRestantes] = useState('');
    const [showModal, setShowModal] = useState(false);

    const taskEstadoAlert = async (id, body, estado, descripcion) => {
        if (estado == false) {
            completarTarea(id, body, estado, descripcion)            
        } else {               
            const inputText = prompt(`Segur@ que quieres cancelar?, Por favor ingresa tu Correo  para Cancelar:`);
            if (inputText == email) {
                // El usuario presionó "Aceptar" y proporcionó una respuesta
                window.alert(`Desististe de la tarea con el correo ${inputText}, se notificara a tu administrador.`);
            } else {
                // El usuario presionó "Cancelar"
                window.alert("Cancelaste!");
                return;
            }
            completarTarea(id, body, estado, descripcion)
        }
        }

    useEffect(() => {
        const fechaLimite = new Date(fechaEntrega).getTime();
      
        const intervalId = setInterval(() => {
          const tiempoRestante = fechaLimite - new Date().getTime();
          const diasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
          const horasRestantes = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutosRestantes = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
          const segundosRestantes = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
      
          if (diasRestantes <= 0) {
            setDiasRestantes('Vencida');
          } else {
            setDiasRestantes(`${diasRestantes} días ${horasRestantes}h ${minutosRestantes}m ${segundosRestantes}s`);
          }
      
          setTimer(`${horasRestantes}h ${minutosRestantes}m ${segundosRestantes}s`);
        }, 1000);
      
        return () => {
          clearInterval(intervalId);
        };
      }, [fechaEntrega]);

    const adminNotification = async (id, turn) => {
        console.log(id, turn)
        if (turn == false) {
            turnChange(id, turn)            
        } else {            
            turnChange(id, turn)   
        }
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    return (
        <div className="border-b p-5 sm:flex items-center">
            <div className='m-1'>
                <div className={`flex border border-black rounded-lg p-1 w-[344,11px] justify-center ${estado ? 'max-h-[283px] h-auto' : 'h-fit'}`}>
                    <div className=' flex flex-col items-center md:items-start '>
                        
                        <p className="mb-1 px-2 text-xl">{nombre}</p>
                        <p className="mb-1 px-2 text-xl">{emailCreador}</p>
                        <p className="mb-1 px-2 text-sm">{ formatearFecha(fechaEntrega) }</p>
                        <p className="mb-3 px-2 text-gray-600">Prioridad: {prioridad}</p>
                        <p className="mb-1 px-2 text-sm text-gray-500 uppercase max-h-[283px] sm:h-[283px] overflow-y-auto border border-pink-100">{descripcion}</p>
                        
                        <div className="flex flex-row m-1">
                            {admin && (
                                <button
                                    className="bg-indigo-600 m-1 h-fit  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                                    onClick={() => handleModalEditarTarea(tarea)}
                                >Editar</button>

                            )}
                            
                            {admin && ( 
                                <button
                                    className="bg-red-600 m-1 h-fit  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                                    onClick={() => handleModalEliminarTarea(tarea)}
                                >Eliminar</button>
                            )}

                            {typeAccount ? 
                                !turn && <button
                                    className="bg-red-600 m-1 h-fit  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                                    onClick={() => adminNotification(_id, turn)}
                                >Admin</button>
                                :                                
                                turn && <button
                                    className="bg-red-600 m-1 h-fit  px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                                    onClick={() => adminNotification(_id, turn)}
                                >Model</button>
                                }
                        </div>
                    </div>
                </div>
            </div>
            <div className='border border-black rounded-lg p-1 m-1 items-center flex flex-col'> 
                {
                estado ?                
                    <div className='container flex flex-col items-center w-fit m-2 border-b border-black p-2'>
                    { estado && <p className="text-xs w-fit bg-green-600 uppercase p-2 rounded-lg text-white">
                        Aceptada por: {tarea.completado.nombre}, {diasRestantes}</p>}
                        <div className='flex justify-center m-1 flex-col'>
                            <FormularioArchivo/>
                        </div>
                    </div>
                    :
                    null
                }
                      
                <div className='flex flex-row items-center justify-center border border-red-100 w-fit h-fit rounded-md p-1 px-10'>
                    
                    <p className='flex justify-center text-stone-400'>{!estado ? "¿Aceptas el pedido?" : "Quiero desistir"}</p>
                    <button
                    className={`${estado ? 'bg-gray-300' : 'bg-pink-200'} px-4 py-3 m-5 text-white uppercase w-fit font-bold text-sm rounded-lg`}
                    onClick={() => taskEstadoAlert(_id, email, estado, descripcion)}
                    >{estado ? 'Desistir' : 'Aceptar'}</button>

                </div>
            </div>
            
            <div>
                {showModal && (
                    <div className="fixed z-50 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50">
                        <NotificationModal onClose={handleModalClose}
                        email={email}
                        typeAccount={typeAccount}
                        emailCreador={emailCreador}
                        
                        />
                    </div>
                )}
            </div>            
        </div>
    )
}

export default Tarea