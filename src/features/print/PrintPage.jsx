// src/features/print/PrintPage.jsx
import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCart } from '../cart/CartContext';

function PrintPage() {
  const { cartItems, getCategoryForVendor } = useCart();

  const groupedByCategory = cartItems.reduce((acc, vendor) => {
    const category = getCategoryForVendor(vendor);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(vendor);
    return acc;
  }, {});

  return (
    <>
      <style>
        {`
        .printable-area {
            display: none;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            display: block;
            width: 100%;
          }
          /* Reset app layout for printing */
          #root, #root > div, #root > div > div {
            display: block !important;
            overflow: visible !important;
          }
          .no-print {
            display: none;
          }
        }
      `}
      </style>
      <div className="printable-area">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            Mi Selección de Proveedores
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              {Object.entries(groupedByCategory).map(([category, vendors]) => (
                <TableBody key={category} sx={{ pageBreakInside: 'avoid' }}>
                  <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell colSpan={4} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', borderTop: '2px solid black' }}>
                      <Typography variant="h6" component="div">{category}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Proveedor</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  </TableRow>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.address}</TableCell>
                      <TableCell>{vendor.contact.phone}</TableCell>
                      <TableCell>{vendor.contact.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </Container>
      </div>
    </>
  );
}

export default PrintPage;