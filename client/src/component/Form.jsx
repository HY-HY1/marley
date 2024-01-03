import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { Button } from './Button';
import  Style  from '../style/form.module.css'

export const Form = ({ postURL, inputs }) => {
    const { creds, setCreds } = useForm();
  
    const handleInputChange = (title, value) => {
      // Convert the title to lowercase
      const lowercaseTitle = title.toLowerCase();
  
      setCreds((prevCreds) => ({
        ...prevCreds,
        [lowercaseTitle]: value,
      }));
    };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Axios to post the credentials to the server
      const response = await axios.post(
        `http://localhost:3001${postURL}`,
        {creds},
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        } 
        );
        if(response.status > 203) {
          console.log('Bad Response')
          return 
        }
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token)
        window.location.href = '/auth'
        
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error posting credentials:', error);
    }
  };

  return (
    <div className={Style.flex}>
      <div className={Style.container}>
        <form >
          {inputs.map((input, index) => (
            <Input
              key={index}
              title={input.title}
              onInputChange={(value) => handleInputChange(input.title, value)}
            />
          ))}
          <Button
            text={'Submit'}
            onClick={handleSubmit}
            size={'m'}
            variant={'primary'}
          />
        </form>
      </div>
    </div>
  );
};

export const Input = ({ title, onInputChange }) => {
  return (
    <div>
      <div className={Style.input}>
        <input
          type="text"
          name={title}
          id={title}
          placeholder={title}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [creds, setCreds] = useState({});

  const contextValue = {
    creds,
    setCreds,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm hook must be used within the FormProvider');
  }
  return context;
};
