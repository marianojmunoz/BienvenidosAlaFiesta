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
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 20px -10px ${theme.palette.primary.light}`,
          },
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