// Aside.js
import React, { useEffect } from 'react';
import Style from '../style/aside.module.css';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useAside } from '../context/AsideContext';
import { useShop } from '../context/ShopContext';
import { CartItem } from './CartItem';

export const Aside = () => {
  const { isAsideVisible, hideAside } = useAside();
  const { cartItems, removeFromCart } = useShop();

  console.log(cartItems)

  const gotoCheckout = () => {
    window.location.href = '/cart'
  }

  return (
    <React.Fragment>
      {isAsideVisible ? (
        <div className={Style.container}>
          <div className={Style.header}>
            <header>
              <Link to={'/cart'}><h1>Cart</h1></Link>
            </header>
          </div>
          <div className={Style.main}>
            <main>
              {cartItems.map((item) => (
                <CartItem key={item.id} id={item.id}/>
              ))}
            </main>
          </div>
          <div className={Style.footer}>
            <footer>
              <Button
                onClick={gotoCheckout}
                isDisabled={false}
                size="small"
                variant="primary"
                isLoading={false}
                text="Checkout"
                className="spacing"
              />
              <br />
              <span></span>
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
