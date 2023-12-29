// ShopContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAside } from './AsideContext';

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // const { showAside } = useAside()

  const localCartItems = localStorage.getItem('cartItems');

  useEffect(() => {
    const storedCartItems = JSON.parse(localCartItems) || [];
    console.log('Initial Cart Items:', storedCartItems);
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
  
  const removeOneFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);
  
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
  
        if (updatedItems[itemIndex].quantity > 1) {
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            quantity: updatedItems[itemIndex].quantity - 1,
          };
        } else {
          updatedItems.splice(itemIndex, 1);
        }
  
        return updatedItems;
      }
  
      return prevItems;
    });
  };
  
  

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cartItems', null)
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  // Calculate total price based on items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      console.log(item.id, item.quantity); // Log item details for debugging
  
      // Ensure item.price and item.quantity are valid numbers
      const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
      const itemQuantity = typeof item.quantity === 'number' && !isNaN(item.quantity) ? item.quantity : 0;
  
      const total1 = itemPrice * itemQuantity;
      // console.log('Quantity',itemQuantity  ); // Logs the correct total for each item
      // console.log('Price', itemPrice )
      return total + total1;
    }, 0);
  };
  
  

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    calculateTotalPrice,
    removeOneFromCart,
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
