import { useEffect } from 'react';
import { getAddressFromCoords } from './geolocation';

/**
 * A custom hook to handle initial geolocation fetching.
 * It attempts to get the user's current position on component mount if no location is provided.
 *
 * @param {object} options The options for the hook.
 * @param {object|null} options.location The current location object.
 * @param {function} options.onLocationChange Callback to update the location.
 * @param {function} options.onSuccess Callback executed after successfully getting the location.
 * @param {function} options.onError Callback to set an error message.
 * @param {function} options.setLoading Callback to set the loading state.
 */
export const useInitialGeolocation = ({ location, onLocationChange, onSuccess, onError, setLoading }) => {
  useEffect(() => {
    if (location && location.address) {
      onSuccess();
      return;
    }

    if (!navigator.geolocation) {
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const address = await getAddressFromCoords(latitude, longitude);
          onLocationChange({ lat: latitude, lng: longitude, address });
        } catch (geoError) {
          onError(geoError.message);
          setLoading(false);
        }
      },
      (err) => {
        onError(`Error de geolocalización: ${err.message}. Por favor, habilite la geolocalización o busque una ciudad.`);
        setLoading(false);
      }
    );
  }, []);
};