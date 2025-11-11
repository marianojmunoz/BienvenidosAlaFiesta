import React from 'react';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useGuestList } from '../guestList/guestListContext';

const PrintButton = ({ ...props }) => {
  const { guests } = useGuestList();

  const handlePrint = () => {
    window.print();
  };

  const isDisabled = guests.length === 0;

  return (
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      disabled={isDisabled}
      sx={{ '@media print': { display: 'none' } }}
      {...props}
    >
      Imprimir
    </Button>
  );
};

export default PrintButton;