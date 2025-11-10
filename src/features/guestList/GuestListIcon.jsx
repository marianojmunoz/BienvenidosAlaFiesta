import React from 'react';
import { Button, Badge } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useGuestList } from './GuestListContext';

function GuestListIcon() {
  const { totalGuests } = useGuestList();

  return (
    <Badge badgeContent={totalGuests} color="secondary">
      <Button component={RouterLink} to="/guest-list" color="inherit" startIcon={<AddIcon />}>
        Lista de Invitados
      </Button>
    </Badge>
  );
}

export default GuestListIcon;
