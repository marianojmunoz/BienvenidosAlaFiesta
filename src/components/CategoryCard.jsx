// src/components/CategoryCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function CategoryCard({ category }) {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        elevation={3}
        sx={{
          height: '100%',
          borderRadius: '16px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 20px -10px ${theme.palette.primary.light}`,
          },
        }}
      >
        <CardActionArea
          component={RouterLink} to={`/proveedores/${category.url}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            height: '180px',
            width: '180px',
            borderRadius: '35px'
          }}
        >
          {category.icon}
          <CardContent>
            <Typography variant="h6" component="div" align="center" sx={{ mt: 1, fontWeight: '500' }}>
              {category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CategoryCard;