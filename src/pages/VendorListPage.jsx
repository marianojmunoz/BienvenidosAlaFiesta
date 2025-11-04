// src/pages/VendorListPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getVendorsByCategory } from '../services/vendorService';
import { Container, Typography, Box, CircularProgress, Alert, List, ListItem, ListItemText, Paper, Button, IconButton, Divider, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function VendorListPage() {
  const { category } = useParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof category === 'string' && category) {
      const fetchVendors = async () => {
        setLoading(true);
        setError(null);
        try {
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
  }, [category]);

  const pageTitle = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Vendors';

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton component={RouterLink} to="/" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" component="h1">
          {pageTitle}
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>Error: {error}</Alert>}

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
            !error && <ListItem><ListItemText primary={"No vendors found for this category."} /></ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default VendorListPage;
