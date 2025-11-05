// src/pages/HomePage.jsx
import React from 'react';

import { Grid, Typography, Container, Box } from '@mui/material';
import { categories } from '../data/categories';
import CategoryCard from '../components/layout/CategoryCard';

function HomePage() {
  
 //const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Planea tu Fiesta Perfecta !!
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Selecciona una categoría para encontrar los mejores proveedores cercanos.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
