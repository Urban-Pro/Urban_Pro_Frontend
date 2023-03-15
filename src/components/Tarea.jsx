import { useState, useEffect } from 'react';
import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import FormularioArchivo from '../components/FormularioArchivo';

const Tarea = ({tarea}) => {

    const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin()

    const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea
    
    const [timer, setTimer] = useState(null);
    const [diasRestantes, setDiasRestantes] = useState('');

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
      
        setTimer(intervalId);
      
        return () => {
          clearInterval(timer);
        };
      }, [fechaEntrega]);
      

    return (
        <div className="border-b p-5 sm:flex items-center">
            <div className='m-1'>
                <div className={`flex border border-black rounded-lg p-1 w-[344,11px] justify-center ${estado ? 'h-[312px]' : 'h-fit'}`}>
                    <div className=' flex flex-col items-center md:items-start '>
                        
                    <p className="mb-1 text-xl">{nombre}</p>
                    <p className="mb-1 text-sm text-gray-500 uppercase w-fit ">{descripcion}</p>
                    <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
                    <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {admin && (
                        <button
                            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleModalEditarTarea(tarea)}
                        >Editar</button>

                    )}
                    
                    {admin && ( 
                        <button
                            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                            onClick={() => handleModalEliminarTarea(tarea)}
                        >Eliminar</button>
                    )}
                </div>
            </div>
            <div className='border border-black rounded-lg p-1 m-1'>       
                <div className='flex flex-col'>
                    
                    <p className='flex justify-center'>¿Aceptas el pedido?</p>
                    <button
                    className={`${estado ? 'bg-gray-600' : 'bg-pink-200'} px-4 py-3 m-5 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completarTarea(_id)}
                    >{estado ? 'Denegar' : 'Aceptar'}</button>

                </div>
                {
                estado ?                
                    <div className='container flex flex-col items-center w-fit m-2 border-t border-black p-2'>
                    { estado && <p className="text-xs w-fit bg-green-600 uppercase p-2 rounded-lg text-white">
                        Aceptada por: {tarea.completado.nombre}, {diasRestantes}</p>}
                        <div className='flex justify-center m-1 flex-col'>
                            <FormularioArchivo/>
                        </div>
                    </div>
                    :
                    null
                }
            </div>           
        </div>
    )
}

export default Tarea