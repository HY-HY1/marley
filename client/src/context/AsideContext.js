// AsideContext.js
import React, { createContext, useContext, useState } from 'react';
import { Aside } from '../component/Aside';

const AsideContext = createContext();

export const AsideProvider = ({ children }) => {
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const showAside = () => {
    setIsAsideVisible(true);
  };


  const hideAside = () => {
    setIsAsideVisible(false);
  };

  return (
    <AsideContext.Provider value={{ isAsideVisible, showAside, hideAside }}>
      <Aside/>
      {children}
    </AsideContext.Provider>
  );
};

export const useAside = () => {
  return useContext(AsideContext);
};
