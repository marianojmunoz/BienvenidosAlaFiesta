// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, location }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (vendor) => {
    setCartItems((prevItems) => {
      // Prevent adding duplicates based on both id and category
      if (prevItems.find((item) => item.id === vendor.id && item.category === vendor.category)) {
        return prevItems;
      }
      return [...prevItems, vendor];
    });
  };

  const removeFromCart = (vendorToRemove) => {
    setCartItems((prevItems) =>
      // Keep items that DO NOT match both the id and category of the item to remove.
      prevItems.filter(item => !(item.id === vendorToRemove.id && item.category === vendorToRemove.category))
    );
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