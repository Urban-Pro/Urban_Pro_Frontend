import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PreviewModelos = ({modelo}) => {

    const {nombre, telegram, email} = modelo



    return (
        <div className='border-b p-5 flex flex-col md:flex-row justify-between'>

            <div className='flex items-center gap-2'>
                <p className='flex-1'>
                    {nombre}

                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {email}
                    </span>
                    <span className='text-sm text-gray-500 uppercase'>
                        {''} {telegram}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default PreviewModelos