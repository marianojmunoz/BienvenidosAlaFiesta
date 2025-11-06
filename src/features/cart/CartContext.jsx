// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, location }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (vendor) => {
    setCartItems((prevItems) => {
      // Prevent adding duplicates
      if (prevItems.find((item) => item.id === vendor.id)) {
        return prevItems;
      }
      return [...prevItems, vendor];
    });
  };

  const removeFromCart = (vendorId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== vendorId));
  };

  const removeCategoryFromCart = (categoryName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.category !== categoryName));
  };

  const getCategoryForVendor = (vendor) => {
    // Now we can reliably get the category from the vendor object
    return vendor.category;
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    removeCategoryFromCart,
    getCategoryForVendor,
    location,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};