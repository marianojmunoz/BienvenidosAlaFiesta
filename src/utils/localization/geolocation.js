// src/utils/geolocation.js

/**
 * Internal helper to call the OpenCage Geocoding API.
 * @param {string} query The search query (e.g., "lat,lng" or "address").
 * @returns {Promise<any>} A promise that resolves to the API response data.
 */
const _callGeocodingApi = async (query) => {
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  if (!apiKey) {
    throw new Error("La clave API de geocodificación no está configurada. Contacta al administrador.");
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=es&pretty=1`;

  const response = await fetch(url);
  const data = await response.json();

  // Check for a successful OpenCage API response
  if (data.status && data.status.code === 200 && data.results && data.results.length > 0) {
    return data;
  }

  // Provide a more detailed error message from the API if available
  if (data.status && data.status.message) {
    throw new Error(`Error de geocodificación: ${data.status.message}`);
  }

  throw new Error("No se pudo procesar la solicitud de geocodificación. La respuesta de la API no fue válida.");
};
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
  const query = `${lat}+${lng}`;
  const data = await _callGeocodingApi(query);
  return data.results[0].formatted;
};

/**
 * Fetches coordinates from a given address string using the OpenCage Geocoding API.
 *
 * @param {string} address The address to search for.
 * @returns {Promise<{lat: number, lng: number, formatted: string}>} A promise that resolves to the location object.
 */
export const getCoordsFromAddress = async (address) => {
  const query = encodeURIComponent(address);
  const data = await _callGeocodingApi(query);
  return {
    ...data.results[0].geometry,
    formatted: data.results[0].formatted,
  };
};
