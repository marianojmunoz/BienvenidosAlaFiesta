// src/components/LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function LocationSelector({ onLocationChange, onRadiusChange, radius }) {
  const [manualLocation, setManualLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const handleRadiusChange = (event) => {
    onRadiusChange(event.target.value);
  };

  useEffect(() => {
    // This function will be called when the component mounts to auto-geolocate.
    const autoGeolocate = () => {
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
              const address = [aCity, aState, country].filter(Boolean).join(', ');

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
          setError('Unable to retrieve your location. Please enter it manually.');
          setLoading(false);
        }
      );
    };

    autoGeolocate();
  }, [onLocationChange]); // The effect runs once on mount

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = 'cd203c9e558746d0a0e592f57c2ab17d'; // Replace with your actual OpenCage API key
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(manualLocation)}&key=${apiKey}&language=es&pretty=1`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const address = data.results[0].formatted;
        const newLocation = {
          lat,
          lng,
          address: address || manualLocation,
        };
        onLocationChange(newLocation);
        setCurrentLocation(newLocation.address);
      } else {
        setError('Could not find coordinates for the entered location.');
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
      setError('Failed to fetch location data. Please try again.');
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {loading && <CircularProgress size={24} />}
        {!loading && (
          <Typography variant="body2" color="text.secondary">Enter a location or use the detected one.</Typography>
        )}
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
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