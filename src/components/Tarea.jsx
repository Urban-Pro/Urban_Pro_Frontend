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
        <div className="border-b p-5 sm:flex justify-start items-center">
            <div className='w-fit lg:w-[600px] p-3'>
                <div className="flex justify-center flex-col">
                    <p className="mb-1 text-xl">{nombre}</p>
                    <p className="mb-1 text-sm text-gray-500 uppercase overflow-y-auto lg:w-fit w-[280px]">{descripcion}</p>
                    <p className="mb-1 text-sm">{ formatearFecha(fechaEntrega) }</p>
                    <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                    <p className="mb-1 text-gray-600">{diasRestantes}</p>       
                    { estado && <p className="text-xs w-fit bg-green-600 uppercase p-1 rounded-lg text-white">Aceptada por: {tarea.completado.nombre}</p>}
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
            <div className='container w-fit m-2 border border-black p-2 rounded-lg'>
                <div className='flex justify-center flex-col'>
                    <FormularioArchivo/>
                    <div className='flex flex-col'>
                        
                        <p className='justify-center flex'>Aceptas el Video?</p>
                        <button
                        className={`${estado ? 'bg-pink-200' : 'bg-gray-600'} px-4 py-3 m-5 text-white uppercase font-bold text-sm rounded-lg`}
                        onClick={() => completarTarea(_id)}
                        >{estado ? 'Acepto' : 'Denegada'}</button>

                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Tarea