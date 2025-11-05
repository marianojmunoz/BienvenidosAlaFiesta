// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import VendorListPage from './pages/VendorListPage';
import Header from './Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CartProvider } from './CartContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#673ab7' },
    secondary: { main: '#f50057' },
    background: { default: '#f4f5f7' },
  },
  typography: {
     fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none' },
      },
    },
  },
});

function App() {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/proveedores/:category" element={<VendorListPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider >
    </CartProvider>
  );
}

export default App;
