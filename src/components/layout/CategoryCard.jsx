// src/components/layout/categoryCard.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function CategoryCard({ category }) {
  const theme = useTheme();
  return (
    <Grid
      item
      sx={{
        flexGrow: 1,
        flexBasis: '16%', // Allows for 5 items with a small gap
        maxWidth: '18%',
      }}
    >
      <Paper
        component={RouterLink}
        to={`/proveedores/${category.url}`}
        elevation={3}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: '16px',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 20px -10px ${theme.palette.primary.light}`,
          },
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
          //transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
        <Box sx={{ mb: 2 }}>
          {category.icon}
        </Box>
        <Typography variant="h6" component="h3">{category.name}</Typography>
      </Paper>
    </Grid>
  );
}

export default CategoryCard;