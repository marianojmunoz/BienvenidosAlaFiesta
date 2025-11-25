// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './features/cart/CartPage';
import VendorListPage from './features/vendors/VendorListPage';
import Header from './components/layout/header';
import GuestListPage from './features/guestList/guestListPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GuestListProvider } from './features/guestList/GuestListContext';
import { CartProvider } from './features/cart/cartContext';

import { glassTheme } from './theme/glassTheme';

function App() {
  const [location, setLocation] = useState({ lat: -31.7909843, lng: -60.4380765, address: 'Buenos Aires, Argentina' });
  const [radius, setRadius] = useState(10); // Default radius in km

  return (
    <CartProvider>
      <GuestListProvider>
        <ThemeProvider theme={glassTheme}>
          <CssBaseline />
          <Router>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)', // Global gradient
              backgroundAttachment: 'fixed'
            }}>
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
