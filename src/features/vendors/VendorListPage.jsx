// src/pages/VendorListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Button, IconButton, Divider, Stack, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../cart/CartContext';

function VendorListPage({ location, radius }) {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, cartItems } = useCart();

  // Find the category object from our data to get the proper name for the title
  const categoryDetails = categories.find(c => c.url === category);
  const pageTitle = categoryDetails ? categoryDetails.name : 'Proveedores';

  useEffect(() => {
    if (category) {
      const fetchVendors = async () => {
        setLoading(true);
        setError(null);
        try {
          // Construct the search term based on category and location
          const data = await searchGooglePlaces(pageTitle, location, radius);
        setVendors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

      fetchVendors();
    } else {
      // If there's no category, ensure we aren't stuck in a loading state.
      setLoading(false);
    }
    // Only re-run the effect if the category changes.
  }, [category, location, radius, pageTitle]);

  const searchGooglePlaces = async (keyword, location, radiusInKm) => {
    // IMPORTANT: Replace with your actual Google Places API key.
    // For production, this key should be stored securely on a backend server.
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const radiusInMeters = radiusInKm * 1000;
    const locationString = `${location.lat},${location.lng}`;

    // Note: The Google Places API requires a proxy to be called from the browser to avoid CORS issues.
    // Using a public proxy is ONLY for development and is not reliable. A proper backend proxy is required for production.
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=${radiusInMeters}&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`;
    const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API Error: ${data.status} - ${data.error_message || ''}`);
    }

    // Map the API results to the format your application expects
    return data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      // 'vicinity' provides a simplified address (street, city).
      address: place.vicinity,
      rating: place.rating || 0,
      category: pageTitle, // Assign the current category
    })).slice(0, 25); // Limit to 25 results
  };



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

      {error && <Alert severity="error" sx={{ mb: 3 }}>Error: {error}</Alert>}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      )}

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
    </Container>
  );
}

export default VendorListPage;
