import { useContext } from 'react'
import ModelosContext from '../context/ModelosProvider'

const useModelos = () => {
    return useContext(ModelosContext)
}

export default useModelos