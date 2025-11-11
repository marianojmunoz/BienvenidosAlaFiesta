// src/components/CartIcon.jsx
import React from 'react';
import { IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from './cartContext';

function CartIcon() {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <IconButton component={RouterLink} to="/cart" color="inherit">
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartIcon;