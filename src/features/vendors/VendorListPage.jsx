// src/pages/VendorListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getVendorsByCategory } from '../../services/vendorService';
import { categories } from '../../data/categories';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Button, IconButton, Divider, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationSelector from '/src/components/layout/LocationSelector.jsx';
import { useCart } from '../cart/CartContext';

function VendorListPage() {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, cartItems } = useCart();
  // Default to a central location if none is provided.
  const [/*location*/, setLocation] = useState({ lat: 40.7128, lng: -74.0060, address: 'New York, NY' });

  useEffect(() => {
    if (category) {
      const fetchVendors = async () => {
      if (!category) return;

      setLoading(true);
      setError(null);
      try {
        // Here you can decide whether to use getVendorsByCategory or getVendorsNearLocation
        // We'll switch back to getVendorsByCategory for now to prevent the page from crashing,
        // as getVendorsNearLocation is not yet implemented.
        const data = await getVendorsByCategory(category);
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
  }, [category]);


  // Find the category object from our data to get the proper name for the title
  const categoryDetails = categories.find(c => c.url === category);
  const pageTitle = categoryDetails ? categoryDetails.name : 'Proveedores';

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
        <LocationSelector onLocationChange={setLocation} />
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
                    secondary={vendor.address}
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
