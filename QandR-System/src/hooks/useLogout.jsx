import React from 'react'
import { useAuthContext } from './useAuthContex'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        navigate('/login')
    }
  return { logout }
}

export default useLogout
