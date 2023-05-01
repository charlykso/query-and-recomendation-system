import { useEffect } from "react";
import { createContext, useReducer } from "react";
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }

        case 'LOGOUT':
            return { usere: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state: ', state);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const Alltoken = JSON.parse(user.Token)
            const token = Alltoken.token
            const decodedToken = jwtDecode(token)
            const expirationDate = new Date(decodedToken.exp * 1000);
            // console.log(expirationDate);
            // console.log(new Date());
            if (expirationDate < new Date()) {
                //remove toke from localstorage
                localStorage.removeItem('user')

                //dispatch logout function
                dispatch({ type: 'LOGOUT' })
                // console.log("Item removed");

                window.location.href = '/login'
            } else {
                dispatch({ type: 'LOGIN', payload: user })
            
            }
            // dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}