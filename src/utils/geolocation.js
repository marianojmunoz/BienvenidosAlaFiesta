// src/utils/geolocation.js

/**
 * Fetches a human-readable address from a given set of coordinates using a reverse geocoding API.
 * This function uses the OpenCage Geocoding API. You'll need to sign up for a free API key at
 * https://opencagedata.com/ and add it to your .env file.
 *
 * @param {number} lat The latitude.
 * @param {number} lng The longitude.
 * @returns {Promise<string>} A promise that resolves to the formatted address string.
 */
export const getAddressFromCoords = async (lat, lng) => {
  // IMPORTANT: Replace this with your actual OpenCage API key.
  // It's best to store this in a .env file and access it via import.meta.env.VITE_OPENCAGE_API_KEY
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&language=es&pretty=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted;
  }

  throw new Error("No se pudo obtener la dirección para su ubicación.");
};

