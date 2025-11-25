// src/pages/HomePage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { categories } from '../data/categories';
import LocationSelector from '../utils/localization/locationSelector';
import CategoryCard from '../components/layout/categoryCard';

function HomePage({ onLocationChange, onRadiusChange, radius }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{
          background: 'linear-gradient(45deg, #8A2BE2 30%, #FF1493 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          Planifica tu Fiesta Perfecta
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
          Encuentra los mejores proveedores para tu evento. Comienza seleccionando tu ubicación y una categoría.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
        <Paper sx={{
          p: 2,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
        }}>
          <LocationSelector onLocationChange={onLocationChange} onRadiusChange={onRadiusChange} radius={radius} />
        </Paper>
      </Box>

      <Grid container spacing={4}>
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
