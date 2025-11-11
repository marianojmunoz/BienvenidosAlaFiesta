// src/features/print/printPage.jsx
import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCart } from '../cart/cartContext';

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
          /* Hide elements not meant for printing */
          .no-print {
            display: none !important;
          }

          /* Styles for dedicated print areas (like this component) */
          .printable-area-container body * {
            visibility: hidden; /* Hide everything by default */
          }
          .printable-area-container .printable-area,
          .printable-area-container .printable-area * {
            visibility: visible; /* Only show the printable area and its children */
          }
          .printable-area-container .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }

          /* --- GLOBAL PRINT STYLES --- */
          /* Ensure html and body expand to show all content */
          html, body {
            height: auto !important;
            overflow: visible !important;
          }
          /* Ensure layout containers expand to show all content */
          #root, #root > div, #root > div > div {
            height: auto !important;
            overflow: visible !important;
            position: static !important; /* Reset any absolute/fixed positioning that might break flow */
          }
          /* Ensure tables and their containers expand for printing */
          .MuiTableContainer-root {
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            box-shadow: none !important;
          }
          /* Prevent table body from breaking across pages awkwardly */
          .MuiTableBody-root {
            page-break-inside: avoid !important;
          }
          table {
            min-width: 100% !important;
          }
        }
      `}
      </style>
      <div className="printable-area no-print">
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
                  </TableRow>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.address}</TableCell>
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