// src/utils/geolocation.js
//const { getJson } = require('serpapi');

/**
 * Internal helper to call the backend proxy for SerpApi.
 * @param {object} params The parameters for the SerpApi request.
 * @returns {Promise<any>} A promise that resolves to the API response data.
 */
import { mockProviders } from '../../data/mockProviders';

/**
 * Internal helper to call the backend proxy for SerpApi.
 * @param {object} params The parameters for the SerpApi request.
 * @returns {Promise<any>} A promise that resolves to the API response data.
 */
const _callSerpApi = async (params) => {
  const proxyUrl = 'http://localhost:3001/api/serpapi-search';
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || errorData.error || `Error en la búsqueda: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Backend unavailable or error, falling back to mock data/logic:", error);
    throw error; // Re-throw to be handled by caller
  }
};

/**
 * Fetches a human-readable address from coordinates using SerpApi's Google Reverse Geocoding.
 * @param {number} lat Latitude.
 * @param {number} lng Longitude.
 * @returns {Promise<{address: string, countryCode: string}>} A promise that resolves to an object with the address and country code.
 */
export const getAddressFromCoords = async (lat, lng) => {
  const params = {
    engine: 'google_maps',
    q: `${lat},${lng}`, // Search by coordinates
    hl: 'es',
    gl: 'ar',
  };

  try {
    const data = await _callSerpApi(params);
    // Google Maps engine returns 'place_results' or 'local_results'
    const place = data?.place_results || data?.local_results?.[0];

    if (!place) {
      // Fallback if API returns empty
      return { address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`, countryCode: 'AR' };
    }

    let address = place.address || place.title || "Dirección desconocida";

    // Check if we have a plus_code which often contains "Code City, State, Country"
    // Example: "6G6Q+5WJ Paraná, Entre Ríos, Argentina"
    if (place.plus_code && place.plus_code.global_code) {
      // Sometimes plus_code is an object with global_code and compound_code
      // We want the compound_code usually, or we parse the string if it's just a string in some API versions
    }

    // In the observed response, plus_code was a string? No, usually it's an object in SerpApi but the log showed "6G6Q+5WJ Paraná..."
    // Let's handle both cases.
    const plusCode = place.plus_code?.compound_code || place.plus_code;

    if (typeof plusCode === 'string' && plusCode.includes(' ')) {
      // Remove the code part (first word) to get "Paraná, Entre Ríos, Argentina"
      const parts = plusCode.split(' ');
      if (parts.length > 1) {
        parts.shift(); // Remove the code
        address = parts.join(' ');
      }
    }

    // If address is still just coordinates (contains numbers and degree symbol), try to clean it up
    if (address && (address.includes('°') || address.match(/^-?\d/))) {
      // If we failed to get a good name from plus_code, and we only have coords, 
      // we might just return the coords but formatted, or keep it as is.
      // But the plus_code logic above should catch the user's case.
    }

    return {
      address: address,
      countryCode: 'AR'
    };
  } catch (e) {
    // Fallback if backend fails
    return { address: `${lat.toFixed(4)}, ${lng.toFixed(4)} (Offline)`, countryCode: 'AR' };
  }
};

/**
 * Fetches coordinates from an address string using SerpApi's Google Maps engine.
 * @param {string} address The address to search for.
 * @returns {Promise<{lat: number, lng: number, address: string} | null>} A promise resolving to the location object or null.
 */
export const getCoordsFromAddress = async (address) => {
  const params = {
    engine: 'google_maps',
    q: address,
    gl: 'ar',
  };

  try {
    const data = await _callSerpApi(params);
    const place = data?.local_results?.[0] || data?.place_results;

    if (place?.gps_coordinates) {
      return {
        lat: place.gps_coordinates.latitude,
        lng: place.gps_coordinates.longitude,
        address: place.address || address,
      };
    }
    return null;
  } catch (e) {
    console.error("Geocoding failed:", e);
    return null; // Or return a default location if critical
  }
};

/**
 * Searches for vendors (places) near a location using SerpApi's Google Maps engine.
 * @param {string} categoryUrl The category URL slug to search for (e.g., "salones-para-eventos").
 * @param {{lat: number, lng: number}} location The latitude and longitude for the search center.
 * @returns {Promise<Array>} A promise that resolves to an array of vendor-like objects.
 */
export const searchVendorsByLocation = async (categoryUrl, location, radius = 10) => {
  if (!location || !location.lat || !location.lng) {
    throw new Error("La ubicación para la búsqueda de proveedores es inválida.");
  }

  // Convert radius (km) to zoom level approximation
  // Rough mapping: 5km≈15z, 10km≈14z, 15km≈13z, 25km≈12z, 50km≈11z
  const zoomMap = { 5: 15, 10: 14, 15: 13, 25: 12, 50: 11 };
  const zoom = zoomMap[radius] || 14;

  const params = {
    engine: 'google_maps',
    q: categoryUrl.replace(/-/g, ' '), // Convert slug to readable query
    ll: `@${location.lat},${location.lng},${zoom}z`,
    gl: 'ar',
    hl: 'es',
    type: 'search', // Ensure it's a search
  };

  try {
    const data = await _callSerpApi(params);

    // Map the 'local_results' from SerpApi to our vendor format.
    const results = (data.local_results || []).map(place => ({
      id: place.place_id,
      name: place.title,
      address: place.address,
      geocodes: {
        latitude: place.gps_coordinates?.latitude,
        longitude: place.gps_coordinates?.longitude,
      },
      rating: place.rating || 0,
      category: categoryUrl,
      thumbnail: place.thumbnail, // Add thumbnail if available
    }));

    if (results.length === 0) {
      // If real API returns nothing, maybe return mock data? 
      // For now, let's respect the empty result but log it.
      console.log("No results found from API.");
    }

    return results;

  } catch (error) {
    console.warn("Using Mock Data due to backend error.");
    // Filter mock providers by category
    return mockProviders.filter(p => p.category === categoryUrl);
  }
};
