import React, { useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const PlacesAutocompleteInput = ({ value, onChange, placeholder }) => {
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place?.formatted_address) {
        onChange(place.formatted_address);
      } else if (place?.name) {
        onChange(place.name);
      }
    }
  };

  if (!isLoaded) {
    return (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mb-4 border p-2 rounded"
      />
    );
  }

  return (
    <Autocomplete
      onLoad={(ref) => (autocompleteRef.current = ref)}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mb-4 border p-2 rounded"
      />
    </Autocomplete>
  );
};

export default PlacesAutocompleteInput;
