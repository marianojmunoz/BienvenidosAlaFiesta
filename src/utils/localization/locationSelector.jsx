// src/components/LocationSelector.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getAddressFromCoords, getCoordsFromAddress } from './geolocation';

function LocationSelector({ onLocationChange, onRadiusChange, radius }) {
  const [manualLocation, setManualLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const handleRadiusChange = (event) => {
    onRadiusChange(event.target.value);
  };

  useEffect(() => {
    // This function will be called when the component mounts to auto-geolocate.
    const autoGeolocate = () => {
      if (!("geolocation" in navigator)) {
        setError("La geolocalización no es compatible con tu navegador.");
        setLoading(false); // Ensure loading is set to false when geolocation is not supported
        return; // Exit the function if geolocation is not supported
      }
      setLoading(true);
      setError(""); // Clear any previous errors

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use the centralized and reliable utility function
            const address = await getAddressFromCoords(latitude, longitude);
            const newLocation = { lat: latitude, lng: longitude, address };
            onLocationChange(newLocation);
            setCurrentLocation(newLocation.address);
          } catch (geoError) {
            console.error("Error during reverse geocoding:", geoError);
            setError(geoError.message || "No se pudo obtener la dirección para tu ubicación.");
            // Fallback to coordinates on error
            const fallbackLocation = { lat: latitude, lng: longitude, address: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` };
            onLocationChange(fallbackLocation);
            setCurrentLocation(fallbackLocation.address);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Geolocalización denegada. Por favor, ingrésala manualmente.");
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
    setError("");

    try {
      const { lat, lng, formatted } = await getCoordsFromAddress(manualLocation);
      const newLocation = {
        lat,
        lng,
        address: formatted || manualLocation,
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

  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {loading && <CircularProgress size={24} />}
        {!loading && currentLocation &&(
          <Typography variant="body2" color='text.secondary' sx={{mt: 1}}>Ubicación: {currentLocation}
          </Typography>
        )}
        <form onSubmit={handleManualSubmit} style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
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