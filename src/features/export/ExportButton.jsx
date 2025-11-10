import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { exportToExcel } from './exportUtils';

const ExportButton = ({ data, filename, sheetName, transformData, disabled, title, summary, ...props }) => {
  const handleExport = () => {
    exportToExcel(data, filename, sheetName, transformData, title, summary);
  };

const isDisabled = disabled || !data || data.length === 0;

  return (
    <Button
      variant="contained"
      disabled={isDisabled}
      color="success"
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      {...props}
    >
      Exportar a Excel
    </Button>
  );
};

export default ExportButton;