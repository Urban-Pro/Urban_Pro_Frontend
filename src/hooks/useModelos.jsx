import { useContext } from 'react'
import ModelosContext from '../context/ModelosProvider'

const useModelos = () => {
    console.log("ModelosCont")
    return useContext(ModelosContext)
}

export default useModelos