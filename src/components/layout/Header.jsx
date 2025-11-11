// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CartIcon from '../../features/cart/CartIcon';
import GuestListIcon from '../../features/guestList/guestListIcon';

function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Bienvenidos a la Fiesta!!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GuestListIcon />
          <CartIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;