// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './features/cart/CartPage';
import VendorListPage from './features/vendors/VendorListPage';
import Header from './components/layout/Header';
import GuestListPage from './features/guestList/guestListPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GuestListProvider } from './features/guestList/GuestListContext';
import { CartProvider } from './features/cart/CartContext';

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
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060, address: 'New York, NY' });
  const [radius, setRadius] = useState(10); // Default radius in km

  return (
    <CartProvider>
      <GuestListProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <Header location={location} />
              <style>
                {`
                  @media print {
                    .printable-content-area {
                      overflow-y: visible !important;
                      height: auto !important;
                    }
                  }
                `}
              </style>
              <div className="printable-content-area" style={{ flex: 1, overflowY: 'auto' }}>
                <Routes>
                  <Route path="/" element={<HomePage onLocationChange={setLocation} onRadiusChange={setRadius} radius={radius} />} />
                  <Route
                    path="/proveedores/:category"
                    element={<VendorListPage location={location} radius={radius} onLocationChange={setLocation} onRadiusChange={setRadius} />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/guest-list" element={<GuestListPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ThemeProvider >
      </GuestListProvider>
    </CartProvider>
  );
}

export default App;
