// src/pages/CartPage.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from './cartContext';
import { Container, Typography, Box, List, ListItem, ListItemText, IconButton, Button, Paper, Divider} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import PrintPage from '../print/printPage';

function CartPage() {
    const { cartItems, removeFromCart, removeCategoryFromCart, getCategoryForVendor } = useCart();

  const groupedByCategory = cartItems.reduce((acc, vendor) => {
    const category = getCategoryForVendor(vendor);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(vendor);
    return acc;
  }, {});

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton component={RouterLink} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            Mi Selección
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Aún no has seleccionado ningún proveedor. ¡Comienza a explorar y añade tus favoritos!
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }} className="no-print">
          <IconButton component={RouterLink} to="/" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Mi Selección de Proveedores
          </Typography>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Imprimir
          </Button>
        </Box>
        {Object.entries(groupedByCategory).map(([category, vendors]) => (
          <Paper elevation={3} sx={{ mb: 4 }} key={category}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
              <Typography variant="h5">{`${category} (${vendors.length})`}</Typography>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => removeCategoryFromCart(category)}
                className="no-print"
              >
                Eliminar Categoría
              </Button>
            </Box>
            <List disablePadding>
              {vendors.map((vendor, index) => (
                <React.Fragment key={vendor.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(vendor)} className="no-print">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={vendor.name}
                      secondary={vendor.address}
                    />
                  </ListItem>
                  {index < vendors.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ))}
      </Container>
      <PrintPage />
    </>
  );
}

export default CartPage;