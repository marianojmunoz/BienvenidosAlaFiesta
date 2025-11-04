// src/data/categories.js
import React from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SecurityIcon from '@mui/icons-material/Security';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const categories = [
  { name: 'Salones', url: 'Salones', icon: React.createElement(MeetingRoomIcon, { sx: { fontSize: 40 } }) },
  { name: 'Servicios de Lunch', url: 'servicios-de-lunch', icon: React.createElement(FastfoodIcon, { sx: { fontSize: 40 } }) },
  { name: 'Fotografía', url: 'fotografia', icon: React.createElement(CameraAltIcon, { sx: { fontSize: 40 } }) },
  { name: 'Decoración', url: 'servicios-de-decoracion', icon: React.createElement(FilterVintageIcon, { sx: { fontSize: 40 } }) },
  { name: 'Modistas', url: 'modistas', icon: React.createElement(ContentCutIcon, { sx: { fontSize: 40 } }) },
  { name: 'DJ\'s', url: 'servicios-dj', icon: React.createElement(HeadphonesIcon, { sx: { fontSize: 40 } }) },
  { name: 'Barras de Tragos', url: 'servicios-barras-tragos', icon: React.createElement(LocalBarIcon, { sx: { fontSize: 40 } }) },
  { name: 'Seguridad Privada', url: 'servicios-seguridad-privada', icon: React.createElement(SecurityIcon, { sx: { fontSize: 40 } }) },
  { name: 'Cotillones', url: 'servicios-cotillon', icon: React.createElement(CelebrationIcon, { sx: { fontSize: 40 } }) },
  { name: 'Batucadas', url: 'batucadas', icon: React.createElement(MusicNoteIcon, { sx: { fontSize: 40 } }) }
];