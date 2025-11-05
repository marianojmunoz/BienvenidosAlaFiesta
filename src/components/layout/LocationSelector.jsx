// src/components/LocationSelector.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function LocationSelector({ onLocationChange }) {
  const [manualLocation, setManualLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you would use a geocoding service to get an address from lat/lng
        const newLocation = {
          lat: latitude,
          lng: longitude,
          address: `Your Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
        };
        onLocationChange(newLocation);
        setCurrentLocation(newLocation.address);
        setManualLocation(''); // Clear manual input
        setLoading(false);
      },
      () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
      }
    );
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      // In a real app, you would use a geocoding service to get lat/lng from the address
      const newLocation = {
        // Dummy coordinates for demonstration
        lat: 40.7128,
        lng: -74.0060,
        address: manualLocation,
      };
      onLocationChange(newLocation);
      setCurrentLocation(newLocation.address);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          startIcon={loading ? <CircularProgress size={20} /> : <MyLocationIcon />}
          onClick={handleGeolocate}
          disabled={loading}
        >
          Use Current Location
        </Button>
        <Typography variant="body2" color="text.secondary">or</Typography>
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px' }}>
          <TextField label="Enter a location" variant="outlined" size="small" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} />
          <Button type="submit" variant="contained">Search</Button>
        </form>
      </Box>
      {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
      {currentLocation && <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Searching near: {currentLocation}</Typography>}
    </Box>
  );
}

export default LocationSelector;