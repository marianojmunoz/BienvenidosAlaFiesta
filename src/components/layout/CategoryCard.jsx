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
          color: 'text.primary',
          background: 'rgba(255, 255, 255, 0.1)', // More transparent
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderColor: theme.palette.primary.main,
          },
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}>
        <Box sx={{
          mb: 2,
          color: theme.palette.primary.main,
          p: 2,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {category.icon}
        </Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>{category.name}</Typography>
      </Paper>
    </Grid>
  );
}

export default CategoryCard;