import React, { useState } from 'react';
import { Box,  Button,  Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Typography,
        Checkbox,  Select,  MenuItem, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGuestList } from './GuestListContext';

const GuestListPage = () => {
  const { guests, totalGuests, handleGuestChange, addGuest, deleteGuest } = useGuestList();
  const [editingCell, setEditingCell] = useState({ id: null, field: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const handlePrint = () => {
    window.print();
  };

  const handleDoubleClick = (id, field) => {
    setEditingCell({ id, field });
  };

  const handleEditChange = (e, id, field) => {
    let value = e.target.value;
    // Prevent negative numbers for numeric fields
    if ((field === 'qty' || field === 'table' || field === 'hasChildren') && value && parseInt(value, 10) < 0) {
      value = '0';
    }
    handleGuestChange(id, field, value);
  };

  const handleBlur = () => {
    setEditingCell({ id: null, field: null });
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = () => {
    deleteGuest(deleteConfirm.id);
    setDeleteConfirm({ open: false, id: null });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, id: null });
  };

  const renderCell = (guest, field) => {
    const isEditing = editingCell.id === guest.id && editingCell.field === field;

    if (isEditing) {
      return (
        <TextField
          size="small"
          value={guest[field]}
          onChange={(e) => handleEditChange(e, guest.id, field)}
          onBlur={handleBlur}
          autoFocus
          fullWidth
          type={field === 'qty' || field === 'table' || field === 'hasChildren' ? 'number' : 'text'}
        />
      );
    }

    return (
      <Box onDoubleClick={() => handleDoubleClick(guest.id, field)} sx={{ width: '100%', minHeight: '24px' }}>
        {guest[field]}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Lista de Invitados
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">
                Total: {totalGuests}
            </Typography>
            <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
            >
                Print
            </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="guest list table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre completo</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="center">Hijos?</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell align="right">N° Mesa</TableCell>
              <TableCell>Tipo Invitado</TableCell>
              <TableCell align="center">Está aquí?</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guests.map((guest) => (
              <TableRow
                key={guest.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onDoubleClick={() => handleDoubleClick(guest.id, 'name')}>
                  {renderCell(guest, 'name')}
                </TableCell>
                <TableCell align="right" onDoubleClick={() => handleDoubleClick(guest.id, 'qty')}>
                  {renderCell(guest, 'qty')}
                </TableCell>
                <TableCell align="center" onDoubleClick={() => handleDoubleClick(guest.id, 'hasChildren')}>
                    {renderCell(guest, 'hasChildren')}
                </TableCell>
                <TableCell onDoubleClick={() => handleDoubleClick(guest.id, 'observations')}>
                  {renderCell(guest, 'observations')}
                </TableCell>
                <TableCell align="right" onDoubleClick={() => handleDoubleClick(guest.id, 'table')}>
                  {renderCell(guest, 'table')}
                </TableCell>
                <TableCell>
                    <Select
                        value={guest.type}
                        onChange={(e) => handleGuestChange(guest.id, 'type', e.target.value)}
                        size="small"
                        sx={{ minWidth: 100 }}
                    >
                        <MenuItem value="Friend">Amigo/a</MenuItem>
                        <MenuItem value="Family">Familia</MenuItem>
                    </Select>
                </TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={guest.isHere}
                        onChange={(e) => handleGuestChange(guest.id, 'isHere', e.target.checked)}
                        inputProps={{ 'aria-label': 'Is here' }}
                    />
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(guest.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Button startIcon={<AddIcon />} onClick={addGuest}>
          Añadir Invitado
        </Button>
      </Box>

      <Dialog open={deleteConfirm.open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro de que quieres eliminar a este invitado?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestListPage;