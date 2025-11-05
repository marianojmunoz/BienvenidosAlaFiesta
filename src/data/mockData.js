// src/data/mockData.js
const createVendor = (id, category, name, extras = []) => ({
  id,
  name: `${name} ${category}`,
  category: category, // Add the category property here
  address: `${120 + id} Almafuerte, Paraná, Entre Rios`,
  contact: {
    phone: '555-010' + id,
    email: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
  },
  description: `Providing high-quality ${category.toLowerCase()} services for any event.`,
  capacity: category === 'Venues' ? 100 + id * 10 : undefined,
  dimensions: category === 'Venues' ? '50x30 ft' : undefined,
  menus: category.includes('Services') ? ['Standard Menu', 'Premium Menu'] : undefined,
  furniture: ['Tables', 'Chairs'],
  extras: ['Extra Lighting', 'Sound System', ...extras],
  paymentTypes: ['Credit Card', 'Bank Transfer', 'Cash'],
  pros: ['Highly rated', 'Flexible packages'],
  cons: ['Limited weekend availability'],
  rating: 4.5,
  reviews: [
    { user: 'Alex', message: 'Absolutely fantastic!' },
    { user: 'Maria', message: 'Great service, highly recommend.' },
  ],
});

export const vendors = {
  'salones-para-eventos': [createVendor(1, 'Salon', 'Grand'), createVendor(2, 'Salon', 'Modern')],
  'servicios-de-lunch': [createVendor(3, 'Servicio de Lunch', 'Gourmet'), createVendor(4, 'Servicio de Lunch', 'Casual')],
  'fotografia': [createVendor(5, 'Fotografía', 'Candid'), createVendor(6, 'Fotografía', 'Artistic')],
  'servicios-de-decoracion': [createVendor(7, 'Decoración', 'Elegant'), createVendor(8, 'Decoración', 'Boho')],
  'modistas': [createVendor(9, 'Modistas', 'Classic'), createVendor(10, 'Modistas', 'Haute Couture')],
  'servicios-dj': [createVendor(11, 'Servicios de DJ', 'Top 40'), createVendor(12, 'Servicios de DJ', 'Vinyl')],
  'servicios-barras-tragos': [createVendor(13, 'Barras de Tragos', 'Mixology'), createVendor(14, 'Barras de Tragos', 'Tiki')],
  'servicios-seguridad-privada': [createVendor(15, 'Seguridad Privada', 'Stealth'), createVendor(16, 'Seguridad Privada', 'Visible')],
  'servicios-cotillon': [createVendor(17, 'Cotillón', 'Custom'), createVendor(18, 'Cotillón', 'Sweet Treats')],
  'batucadas': [createVendor(19, 'Batucada', 'Samba'), createVendor(20, 'Batucada', 'Fusion')],
};
