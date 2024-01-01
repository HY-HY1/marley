import React, { useState } from 'react';
import { Form } from '../component/Form';
import { FormProvider } from '../component/Form';
import Auth from '../utils/Auth'; // Import Auth

export const Account = () => {
  const [choice, setChoice] = useState(true);
  const login = [
    { title: 'email' },
    { title: 'password' },
    // Add more input configurations as needed
  ];

  const register = [
    { title: 'email' },
    { title: 'password' },
    { title: 'name' },
    // Add more input configurations as needed
  ];

  const inputs = choice ? login : register;

  let postUrl;

  if (choice) {
    postUrl = '/account/login';
  } else {
    postUrl = '/account/register';
  }

  console.log(postUrl);

  return (
    <React.Fragment>
      <FormProvider>
        {/* Pass 'postUrl' as a prop to the Form component */}
        <Form inputs={inputs} postURL={postUrl} />
        {choice ? (
          <p onClick={() => setChoice(!choice)}>Register</p>
        ) : (
          <p onClick={() => setChoice(!choice)}>Login</p>
        )}
      </FormProvider>
    </React.Fragment>
  );
};
