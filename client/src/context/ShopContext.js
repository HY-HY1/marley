// ShopContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const localCartItems = localStorage.getItem('cartItems');

  useEffect(() => {
    const storedCartItems = JSON.parse(localCartItems) || [];
    setCartItems(storedCartItems);
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId, itemPrice) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);
  
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = { id: itemId, quantity: updatedItems[itemIndex].quantity + 1, price: itemPrice };
        return updatedItems;
      }
  
      return [...prevItems, { id: itemId, quantity: 1, price: itemPrice }];
    });
  };
  

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  // Calculate total price based on items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Assuming each item has a 'price' property
      const itemPrice = typeof item.price === 'number' ? item.price : 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    calculateTotalPrice,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopContextProvider');
  }

  return context;
};
