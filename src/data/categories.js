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
  { name: 'Salones', url: 'venues', icon: React.createElement(MeetingRoomIcon, { sx: { fontSize: 40 } }) },
  { name: 'Servicios de Lunch', url: 'lunch-services', icon: React.createElement(FastfoodIcon, { sx: { fontSize: 40 } }) },
  { name: 'Fotógrafos', url: 'photographers', icon: React.createElement(CameraAltIcon, { sx: { fontSize: 40 } }) },
  { name: 'Decoración', url: 'decoration-services', icon: React.createElement(FilterVintageIcon, { sx: { fontSize: 40 } }) },
  { name: 'Modistas', url: 'seamstresses', icon: React.createElement(ContentCutIcon, { sx: { fontSize: 40 } }) },
  { name: 'DJ\'s', url: 'dj-services', icon: React.createElement(HeadphonesIcon, { sx: { fontSize: 40 } }) },
  { name: 'Barras de Tragos', url: 'cocktail-bar-services', icon: React.createElement(LocalBarIcon, { sx: { fontSize: 40 } }) },
  { name: 'Seguridad Privada', url: 'private-security-services', icon: React.createElement(SecurityIcon, { sx: { fontSize: 40 } }) },
  { name: 'Cotillones', url: 'party-favor-services', icon: React.createElement(CelebrationIcon, { sx: { fontSize: 40 } }) },
  { name: 'Batucadas', url: 'batucadas', icon: React.createElement(MusicNoteIcon, { sx: { fontSize: 40 } }) }
];