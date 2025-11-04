// src/services/vendorService.js
import { vendors } from '../data/mockData';

export const getVendorsByCategory = async (category) => {
  console.log(`Fetching vendors for category: ${category}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  if (vendors[category]) {
    return vendors[category];
  } else {
    throw new Error('Category not found');
  }
};

export const getVendorById = async (category, id) => {
    console.log(`Fetching vendor with id: ${id} from category: ${category}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const vendorList = vendors[category];
    if (!vendorList) {
      throw new Error('Category not found');
    }
    const vendor = vendorList.find(v => v.id === parseInt(id));
    if (vendor) {
        return vendor;
    } else {
        throw new Error('Vendor not found');
    }
};
