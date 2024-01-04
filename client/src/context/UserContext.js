import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { Auth } from '../utils/Auth'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState([])
    const [ customerId, setCustomerId ] = useState('')
    const [ paymentIds , setPaymentIds ] = useState('')

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
        const fetchStripeCustomer = async () => {
            
            try {
                const response = await axios.post(
                    'http://localhost:3001/stripe/customers',
                    {},
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                    )
                    if(response > 203) {
                        console.log('Bad Response')
                        return
                    }
                    console.log('Customer Id',response.data.customers.data[0].id)
                    localStorage.setItem('customerId', response.data.customers.data[0].id)
                    setCustomerId(response.data.customers.data[0].id)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStripeCustomer()
        const fetchPaymentId = async () => {
            const localCustomerId = localStorage.getItem('customerId');
            try {
                const response = await axios.get(
                    'http://localhost:3001/stripe/checkout-sessions',
                    { customerId: localCustomerId },
                    {}
                );
                if (response.status >= 203) {
                    return;
                }

                console.log('Server response:', response.data);

                setPaymentIds(response.data.checkoutId); // Ensure to extract the correct property
            } catch (error) {
                console.error('Error fetching payment IDs:', error);
            }
        };
        fetchPaymentId();

    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!paymentIds || paymentIds.length === 0) {
                console.log('No payment ID');
                return;
            }

            try {
                const response = await axios.post(
                    'http://localhost:3001/stripe/items',
                    { checkoutIds: paymentIds }
                );

                console.log(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();

    }, [paymentIds]);



    const contextValue = {
        user,
        customerId
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