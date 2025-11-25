// src/features/vendors/VendorListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Button, IconButton, Divider, Stack, Rating, Collapse, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useCart } from '../cart/cartContext';
import LocationSelector from '../../utils/localization/locationSelector';
import { searchVendorsByLocation } from '../../utils/localization/geolocation';
import { getDistanceFromLatLonInKm } from '../../utils/distance';

function VendorListPage({ location, radius, onLocationChange, onRadiusChange }) {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, cartItems } = useCart();

  const categoryDetails = categories.find(c => c.url === category);
  const pageTitle = categoryDetails ? categoryDetails.name : 'Proveedores';

  const fetchVendors = useCallback(async () => {
    if (!category) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchVendorsByLocation(categoryDetails.url, location, radius);
      // Calculate distance for each vendor
      const vendorsWithDistance = data.map(vendor => {
        let distance = null;
        if (location?.lat && location?.lng && vendor.geocodes?.latitude && vendor.geocodes?.longitude) {
          distance = getDistanceFromLatLonInKm(
            location.lat,
            location.lng,
            vendor.geocodes.latitude,
            vendor.geocodes.longitude
          );
        }
        return { ...vendor, distance };
      });

      // Filter by radius - only show vendors within the selected distance
      const filteredVendors = vendorsWithDistance.filter(vendor =>
        vendor.distance !== null && vendor.distance <= radius
      );

      // Sort by distance if available
      filteredVendors.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));

      setVendors(filteredVendors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, categoryDetails, location, radius]);

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setVendors([]); // Clear previous results
      fetchVendors();
    }
  }, [location, radius, fetchVendors]);

  if (!category) {
    return <Alert severity="warning">No category selected. Please go back to the homepage and select a category.</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={RouterLink} to="/" sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.5)' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {pageTitle}
          </Typography>
        </Box>
      </Box>

      <Collapse in={!loading} sx={{ mb: 4 }}>
        <Paper sx={{ p: 2, borderRadius: 4, background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}>
          <LocationSelector onLocationChange={onLocationChange} onRadiusChange={onRadiusChange} radius={radius} location={location} />
        </Paper>
      </Collapse>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} action={
          <Button color="inherit" size="small" onClick={fetchVendors}>
            Reintentar Búsqueda
          </Button>
        }>
          Error: {error}
        </Alert>)}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      ) : (
        <Stack spacing={2}>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <Paper
                key={`${vendor.id}-${vendor.category}`}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    background: 'rgba(255, 255, 255, 0.75)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {vendor.name}
                      </Typography>
                      {vendor.distance !== null && (
                        <Chip
                          icon={<DirectionsCarIcon sx={{ fontSize: 16 }} />}
                          label={`${vendor.distance} km`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ height: 24, bgcolor: 'rgba(138, 43, 226, 0.1)', border: 'none' }}
                        />
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      {vendor.address}
                    </Typography>

                    {vendor.rating > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating name="read-only" value={vendor.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">({vendor.rating})</Typography>
                      </Box>
                    )}
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<LocationOnIcon />}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${vendor.name} ${vendor.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: 2 }}
                    >
                      Mapa
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => addToCart(vendor)}
                      disabled={cartItems.some(item => item.id === vendor.id && item.category === vendor.category)}
                      sx={{ borderRadius: 2 }}
                    >
                      {cartItems.some(item => item.id === vendor.id && item.category === vendor.category) ? 'Añadido' : 'Añadir'}
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            ))
          ) : (
            !error && <Paper sx={{ p: 4, textAlign: 'center', background: 'rgba(255,255,255,0.5)' }}>
              <Typography>No se encontraron proveedores cercanos para esta categoría.</Typography>
            </Paper>
          )}
        </Stack>
      )}
    </Container>
  );
}

export default VendorListPage;