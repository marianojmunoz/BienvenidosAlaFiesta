// src/components/LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getAddressFromCoords, getCoordsFromAddress } from './geolocation';

function LocationSelector({ onLocationChange, onRadiusChange, radius, location }) {
  const [manualLocation, setManualLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(location?.address || "");

  const handleRadiusChange = (event) => {
    onRadiusChange(event.target.value);
  };

  useEffect(() => {
    // Sync internal state if the parent's location prop changes
    setCurrentLocation(location?.address || "");
  }, [location?.address]); // Reruns when the location prop changes

  const handleAutoGeolocate = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalización no compatible. Usando ubicación predeterminada.");
      const defaultLocation = {
        lat: -34.6037,
        lng: -58.3816,
        address: 'Buenos Aires, Argentina',
      };
      onLocationChange(defaultLocation);
      setCurrentLocation(defaultLocation.address);
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationData = await getAddressFromCoords(latitude, longitude);

          if (locationData.countryCode && locationData.countryCode !== 'AR') {
            setError("Ubicación fuera de Argentina. Usando ubicación predeterminada.");
            const defaultLocation = { lat: -34.6037, lng: -58.3816, address: 'Buenos Aires, Argentina' };
            onLocationChange(defaultLocation);
            setCurrentLocation(defaultLocation.address);
          } else {
            const newLocation = { lat: latitude, lng: longitude, address: locationData.address };
            onLocationChange(newLocation);
            setCurrentLocation(newLocation.address);
          }

        } catch (geoError) {
          console.error("Error during reverse geocoding:", geoError);
          setError(geoError.message || "No se pudo obtener la dirección para tu ubicación.");
          const fallbackLocation = { lat: latitude, lng: longitude, address: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` };
          onLocationChange(fallbackLocation);
          setCurrentLocation(fallbackLocation.address);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Geolocalización denegada. Usando ubicación predeterminada.");
        setLoading(false);
        // Set default location to Buenos Aires on geolocation failure
        const defaultLocation = {
          lat: -34.6037,
          lng: -58.3816,
          address: 'Buenos Aires, Argentina',
        };
        onLocationChange(defaultLocation);
        setCurrentLocation(defaultLocation.address);
      }
    );
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;

    setLoading(true);
    setError("");
    setManualLocation("");

    try {
      const newLocationData = await getCoordsFromAddress(manualLocation);
      if (!newLocationData) {
        setError("No se pudo encontrar la ubicación. Intente con otra búsqueda.");
        setLoading(false);
        return;
      }
      const newLocation = {
        lat: newLocationData.lat,
        lng: newLocationData.lng,
        address: newLocationData.address || manualLocation,
      };
      onLocationChange(newLocation);
      setCurrentLocation(newLocation.address);
    } catch (geoError) {
      console.error("Error during geocoding:", geoError);
      setError(geoError.message || "Error al obtener los datos de ubicación.");
    } finally {
      setLoading(false);
    }
  };

  // Format address for display: remove country (last part after last comma)
  const displayAddress = currentLocation.includes(',') && currentLocation.split(',').length > 2
    ? currentLocation.substring(0, currentLocation.lastIndexOf(',')).trim()
    : currentLocation;

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {loading && <CircularProgress size={24} />}
        {!loading && currentLocation && (
          <Typography variant="body2" color='text.secondary'>
            Ubicación: {displayAddress}
          </Typography>
        )}
        <IconButton onClick={handleAutoGeolocate} color="primary" aria-label="detect current location" disabled={loading}>
          <MyLocationIcon />
        </IconButton>
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px' }}>
          <TextField label="Ingresar ubicación" variant="outlined" size="small" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} />
          <Button type="submit" variant="contained">Buscar</Button>
        </form>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="radius-select-label">Radio</InputLabel>
          <Select
            labelId="radius-select-label"
            id="radius-select"
            value={radius}
            label="Radio"
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
    </Box>
  );
}

export default LocationSelector;