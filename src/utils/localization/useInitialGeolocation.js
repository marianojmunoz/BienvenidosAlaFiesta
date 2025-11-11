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
    // If a location with an address already exists, just run the success callback (e.g., fetch vendors).
    if (location && location.address) {
      onSuccess();
      return;
    }

    // If geolocation is not supported, do nothing.
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
          // The onSuccess callback will be triggered by the location change in the parent component.
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
    // We only want this to run once on mount, so we pass an empty dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};