// Aside.js
import React, { useEffect } from 'react';
import Style from '../style/aside.module.css';
import { Button } from './Button';
import { useAside } from '../context/AsideContext';

export const Aside = () => {
  const { isAsideVisible, hideAside } = useAside();


  return (
    <React.Fragment>
      {isAsideVisible ? (
        <div className={Style.container}>
          <div className={Style.header}>
            <header>
              <h1>Cart</h1>
            </header>
          </div>
          <div className={Style.main}>
            <main>
                <h1>This is my content</h1>
            </main>
          </div>
          <div className={Style.footer}>
            <footer>
              <Button
                onClick={hideAside}
                isDisabled={false}
                size="small"
                variant="primary"
                isLoading={false}
                text="Checkout"
                className="additionalClass"
              />
              <br />
                <Button
                onClick={hideAside}
                isDisabled={false}
                size="small"
                variant="primary"
                isLoading={false}
                text="Continue Shopping"
                className="additionalClass"
              />
              {/* Add more buttons or content as needed */}
            </footer>
          </div>
        </div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};
