// Cart.js
import React from 'react';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../component/CartItem';
import { StripeCheckout } from '../utils/StripeCheckout';

export const Cart = () => {
  const { cartItems, removeFromCart, clearCart, calculateTotalPrice } = useShop();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <CartItem key={item.id} id={item.id} onRemove={() => removeFromCart(item.id)} />
      ))}
      <p>Total Price: {calculateTotalPrice()}</p>
      <StripeCheckout amount={calculateTotalPrice()} />
    </div>
  );
};
