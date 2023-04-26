import { useState } from 'react'
import { useAuthContext } from './useAuthContex'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signin = async ( url, formdata) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                // Authorization: 'Bearer ' + jwt,
            },
            body: formdata,
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
            if (json.Role == 'Admin') {
                navigate('/admin')
            }else if(json.Role == 'Lecturer')
            {
                navigate('/lecturer')
            }else{
                navigate('/')
            }
        }
    }
  return { signin, isLoading, error}
}

export default useLogin