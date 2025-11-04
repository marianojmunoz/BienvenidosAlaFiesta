// src/data/mockData.js
const createVendor = (id, category, name, extras = []) => ({
  id,
  name: `${name} ${category}`,
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
  venues: [createVendor(1, 'Venues', 'Grand'), createVendor(2, 'Venues', 'Modern')],
  'lunch-services': [createVendor(3, 'Lunch Services', 'Gourmet'), createVendor(4, 'Lunch Services', 'Casual')],
  photographers: [createVendor(5, 'Photographers', 'Candid'), createVendor(6, 'Photographers', 'Artistic')],
  'decoration-services': [createVendor(7, 'Decoration Services', 'Elegant'), createVendor(8, 'Decoration Services', 'Boho')],
  seamstresses: [createVendor(9, 'Seamstresses', 'Classic'), createVendor(10, 'Seamstresses', 'Haute Couture')],
  'dj-services': [createVendor(11, 'DJ Services', 'Top 40'), createVendor(12, 'DJ Services', 'Vinyl')],
  'cocktail-bar-services': [createVendor(13, 'Cocktail Bar Services', 'Mixology'), createVendor(14, 'Cocktail Bar Services', 'Tiki')],
  'private-security-services': [createVendor(15, 'Private Security Services', 'Stealth'), createVendor(16, 'Private Security Services', 'Visible')],
  'party-favor-services': [createVendor(17, 'Party Favor Services', 'Custom'), createVendor(18, 'Party Favor Services', 'Sweet Treats')],
};
