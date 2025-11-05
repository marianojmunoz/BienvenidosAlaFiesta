// src/components/LocationSelector.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function LocationSelector({ onLocationChange, onRadiusChange, radius }) {
  const [manualLocation, setManualLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const handleRadiusChange = (event) => {
    onRadiusChange(event.target.value);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Replace with your actual OpenCage API key
          const apiKey = 'cd203c9e558746d0a0e592f57c2ab17d';
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=es&pretty=1`);
          const data = await response.json();

          let newLocation;
          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            const { city, town, village, state, province, county, country } = components;

            const aCity = city || town || village;
            const aState = province || state || county;
            const address = [country,  aState, aCity ].filter(Boolean).join(', ');

            newLocation = {
              lat: latitude,
              lng: longitude,
              address: address || 'Current Location',
            };
          } else {
            // Fallback if address components are not available
            newLocation = { lat: latitude, lng: longitude, address: 'Current Location' };
          }
          onLocationChange(newLocation);
          setCurrentLocation(newLocation.address);
          setManualLocation(''); // Clear manual input
        } catch (error) {
          console.error("Error during reverse geocoding:", error);
          setError('Could not fetch address for your location.');
          // Fallback to coordinates on error
          const fallbackLocation = { lat: latitude, lng: longitude, address: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` };
          onLocationChange(fallbackLocation);
          setCurrentLocation(fallbackLocation.address);
        } finally {
          setLoading(false);
        }
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
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="radius-select-label">Radius</InputLabel>
          <Select
            labelId="radius-select-label"
            id="radius-select"
            value={radius}
            label="Radius"
            onChange={handleRadiusChange}
          >
            <MenuItem value={5}>5 km</MenuItem>
            <MenuItem value={10}>10 km</MenuItem>
            <MenuItem value={15}>15 km</MenuItem>
            <MenuItem value={25}>25 km</MenuItem>
            <MenuItem value={50}>50 km</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
      {currentLocation && <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>Searching near: {currentLocation}</Typography>}
    </Box>
  );
}

export default LocationSelector;