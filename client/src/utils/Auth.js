// auth.js
import axios from 'axios';

export const Auth = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No Token Provided');
    window.location.href = '/account';
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:3001/account/dashboard',
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status !== 200) {
      console.log('Server Had a red response');
      window.location.href = '/account';
      return;
    }

    window.location.href = '/dashboard';
  } catch (error) {
    console.log('There was an error', error);
    window.location.href = '/account';
  }
  return (
    <>
      <p>Loading</p>
    </>
  )
};
