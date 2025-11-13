// src/data/categories.js
import React from 'react';
import {
  MeetingRoom, Fastfood, CameraAlt, FilterVintage, ContentCut, Headphones, LocalBar,
  Security, Celebration, MusicNote, ChildFriendly,
  TheaterComedy, FaceRetouchingNatural, MoreHoriz,
  Star,
  Checkroom,
  ChildCare,
  FamilyRestroom,
  EmojiEvents,
  HouseTwoTone,
  HouseRounded
} from '@mui/icons-material';

export const categories = [
  { name: 'Salones para Eventos', url: 'salones-para-eventos', icon: React.createElement(MeetingRoom, { sx: { fontSize: 40 } }) },
  { name: 'Servicios de Lunch', url: 'servicios-de-lunch', icon: React.createElement(Fastfood, { sx: { fontSize: 40 } }) },
  { name: 'Fotografía', url: 'fotografia', icon: React.createElement(CameraAlt, { sx: { fontSize: 40 } }) },
  { name: 'Decoración', url: 'servicios-de-decoracion', icon: React.createElement(FilterVintage, { sx: { fontSize: 40 } }) },
  { name: 'Modistas', url: 'modistas', icon: React.createElement(ContentCut, { sx: { fontSize: 40 } }) },
  { name: 'DJ\'s', url: 'servicios-dj', icon: React.createElement(Headphones, { sx: { fontSize: 40 } }) },
  { name: 'Barras de Tragos', url: 'servicios-barras-tragos', icon: React.createElement(LocalBar, { sx: { fontSize: 40 } }) },
  { name: 'Seguridad Privada', url: 'servicios-seguridad-privada', icon: React.createElement(Security, { sx: { fontSize: 40 } }) },
  { name: 'Cotillones', url: 'servicios-cotillon', icon: React.createElement(Celebration, { sx: { fontSize: 40 } }) },
  { name: 'Batucadas', url: 'batucadas', icon: React.createElement(MusicNote, { sx: { fontSize: 40 } })},
  { name: 'Sastrerias', url: 'sastrerias', icon: React.createElement(Checkroom, { sx: { fontSize: 40 } })},
  { name: 'Fuegos Artificiales', url: 'fuegos-artificiales', icon: React.createElement(Star, { sx: { fontSize: 40 } })},
  { name: 'Peloteros', url: 'peloteros', icon: React.createElement(HouseRounded, { sx: { fontSize: 40 } })},
  { name: 'Entretenimiento', url: 'entretenimiento', icon: React.createElement(TheaterComedy, { sx: { fontSize: 40 } })},
  { name: 'Maquillaje', url: 'maquillaje', icon: React.createElement(FaceRetouchingNatural, { sx: { fontSize: 40 } })},
  { name: 'Otros', url: 'otros', icon: React.createElement(MoreHoriz, { sx: { fontSize: 40 } })}

];
