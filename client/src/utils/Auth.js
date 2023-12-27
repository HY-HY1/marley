import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Auth = () => {
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const AuthUser = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    console.log('No Token Provided')
                    window.location.href = '/account/login';
                    return;
                }

                const response = await axios.post(
                    'http://localhost:3001/account/dashboard',
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (response.status !==200) {
                    setLoading(false);
                    window.location.href = '/account/login';
                    console.log('Server Had a red response')
                    return;
                }

                setLoading(false);
                window.location.href = '/dashboard';
            } catch (error) {
                window.location.href = '/account/login';
                console.log('There was an error', error)
                setLoading(false);
            }
        };

        AuthUser();
    }, []); 

    return (
        <div>
            {loading ? (
                // Show a loading indicator or message while waiting for the authentication check
                <p>Loading...</p>
            ) : (
                <p></p>
            )}
        </div>
    );
};
