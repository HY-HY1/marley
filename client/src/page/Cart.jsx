import React from 'react';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../component/CartItem';
import { StripeCheckout } from '../utils/StripeCheckout';
import Style from '../style/cart.module.css';
import { Button } from '../component/Button';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart, calculateTotalPrice } = useShop();

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.id} id={item.id} quantity={item.quantity} onRemove={() => removeFromCart(item.id)} />
      ))}
      {cartItems.length > 0 ? (
        <div className={Style.checkout}>
          <ul>
            <li>
              <div className={Style.total}>
                <p>Total: £{calculateTotalPrice()}</p>
              </div>
            </li>
            <li>
              <div className={Style.checkoutBtn}>
                <StripeCheckout amount={calculateTotalPrice() } />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className={Style.empty}>
          <h1>Your Cart is empty</h1>
          <div className={Style.shop}>
            <Button
              link={'/'}
              isDisabled={false}
              size="medium"
              variant="primary"
              isLoading={false}
              text="Shop Now"
              className="additionalClass"
            />
          </div>
        </div>
      )}
    </div>
  );
};
