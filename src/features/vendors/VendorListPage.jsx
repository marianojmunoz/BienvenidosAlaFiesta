// src/pages/VendorListPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Button, IconButton, Divider, Stack, Rating, Collapse } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Keep
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../cart/CartContext';
import LocationSelector from '../../components/layout/LocationSelector';
import { getAddressFromCoords } from '../../utils/geolocation';

function VendorListPage({ location, radius, onLocationChange, onRadiusChange }) {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, cartItems } = useCart();

  // Find the category object from our data to get the proper name for the title
  const categoryDetails = categories.find(c => c.url === category);
  const pageTitle = categoryDetails ? categoryDetails.name : 'Proveedores';

  const searchSerperPlaces = useCallback(async (keyword, searchLocation, searchRadius) => {
    // No need for API key on the client-side when using a proxy

    if (!searchLocation || !searchLocation.lat || !searchLocation.lng) {
      console.error("Location data is incomplete for search.");
      throw new Error("La configuración para buscar proveedores no está completa. Por favor, contacta al administrador.");
    }

    const locationQuery = searchLocation.address || `${searchLocation.lat},${searchLocation.lng}`;
    const url = `https://api.serper.dev/search`;
    const categoryMap = { "Pastelerias": "bakery", "Salones de fiesta": "event venue" };
    const baseQuery = categoryMap[keyword] || keyword;
    const serperQuery = `${baseQuery} within ${searchRadius}km`;

    // Call your backend proxy instead of the Serper API directly
    const proxyUrl = `http://localhost:3001/api/search-vendors`; // Adjust port if your backend is different
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // The API key is now sent by the proxy server, so it's removed from the client-side call.
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ q: serperQuery, location: locationQuery, type: "places", num: 25 })
    });

    const data = await response.json();
    if (!response.ok || data.error) throw new Error(`Proxy Error: ${data.error || response.statusText}`);
    return (data.places || []).map(place => ({ id: place.place_id, name: place.title, address: place.address, geocodes: { latitude: place.latitude, longitude: place.longitude }, rating: place.rating || 0, category: keyword })).slice(0, 25);
  }, []);

  const fetchVendors = useCallback(async () => {
    if (!category) {
      // If there's no category, ensure we aren't stuck in a loading state.
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchSerperPlaces(pageTitle, location, radius);
      setVendors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, pageTitle, location, radius, searchSerperPlaces]);

  useEffect(() => {
    // On initial mount, try to get the user's location if one isn't already set.
    // If a location exists, fetch vendors immediately.
    if (location && location.address) {
      fetchVendors();
    } else {
      setLoading(true); // Start loading while we geolocate
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const address = await getAddressFromCoords(latitude, longitude);
            onLocationChange({ lat: latitude, lng: longitude, address });
            // The state update will trigger the next effect to fetch vendors.
          } catch (geoError) {
            setError(geoError.message);
            setLoading(false);
          }
        },
        (err) => {
          setError(`Error de geolocalización: ${err.message}. Por favor, habilite la geolocalización o busque una ciudad.`);
          setLoading(false); // Stop loading if geolocation fails
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This effect will run whenever the location is updated by the user,
    // but we skip the very first render to avoid a double-fetch.
    const isInitialMount = !vendors.length && !error;
    if (!isInitialMount && location && location.lat && location.lng) {
      fetchVendors();
    }
  }, [location]); // Only depends on location

  // If there's no category, don't attempt to render the rest of the page.
  if (!category) {
    return <Alert severity="warning">No category selected. Please go back to the homepage and select a category.</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={RouterLink} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h3" component="h1">
            {pageTitle}
          </Typography>
        </Box>
      </Box>

      <Collapse in={!loading} sx={{ mb: 4 }}>
        <LocationSelector onLocationChange={onLocationChange} onRadiusChange={onRadiusChange} radius={radius} location={location} />
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
        <Paper elevation={3}>
          <List disablePadding>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <React.Fragment key={vendor.id}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<LocationOnIcon />}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendor.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${vendor.name} on map`}
                        >
                          Mapa
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddShoppingCartIcon />}
                          onClick={() => addToCart(vendor)}
                          disabled={cartItems.some(item => item.id === vendor.id)}
                          aria-label={`Add ${vendor.name} to cart`}
                        >
                          Añadir
                        </Button>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={vendor.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary" display="block">
                            {vendor.address}
                          </Typography>
                          {vendor.rating > 0 && (
                            <Rating name="read-only" value={vendor.rating} precision={0.5} readOnly size="small" />
                          )}
                        </>
                      }
                      primaryTypographyProps={{ variant: 'h6', component: 'p' }}
                    />
                  </ListItem>
                  {index < vendors.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))
            ) : (
              !error && <ListItem><ListItemText primary={"No se encontraron proveedores para esta categoría."} /></ListItem>
            )}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default VendorListPage;
