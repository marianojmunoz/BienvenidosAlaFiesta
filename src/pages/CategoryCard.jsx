// src/components/CategoryCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

function CategoryCard({ category }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
        }}
      >
        <CardActionArea component={RouterLink} to={`/vendors/${category.url}`}>
          <Box sx={{ pt: 3, display: 'flex', justifyContent: 'center', color: 'primary.main' }}>
            {category.icon}
          </Box>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {category.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CategoryCard;