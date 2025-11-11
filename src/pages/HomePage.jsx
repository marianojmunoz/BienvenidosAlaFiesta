// src/pages/HomePage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box } from '@mui/material';
import { categories } from '../data/categories';
import LocationSelector from '../components/layout/locationSelector';
import CategoryCard from '../components/layout/categoryCard';

function HomePage({ onLocationChange, onRadiusChange, radius }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom >
          Planifica tu Fiesta Perfecta
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Encuentra los mejores proveedores para tu evento. Comienza seleccionando tu ubicación y una categoría.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <LocationSelector onLocationChange={onLocationChange} onRadiusChange={onRadiusChange} radius={radius} />
      </Box>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
