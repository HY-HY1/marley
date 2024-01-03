import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { Auth } from '../utils/Auth'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState([])

    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchUser = async () => {
            if(!token) {
                return
            }
            try {
                const response = await axios.post(
                    'http://localhost:3001/account/dashboard',
                    {},
                    {
                        headers: {
                            Authorization: token
                        }
                    }

                )
                if(response.status !==200) {
                    console.log('Bad request')
                    return
                }
                setUser(response.data.User)
                console.log('User', response.data.User)
            } catch (error) {

            }
        }
        fetchUser()
    }, [])



    const contextValue = {
        user,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useContext must be in User Provider')
    }

    return context
}