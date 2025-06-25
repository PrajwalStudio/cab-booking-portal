'use client';

import { useEffect } from 'react';

export function usePlacesAutocomplete(inputId: string, onPlaceSelected: (place: string) => void) {
  useEffect(() => {
    const input = document.getElementById(inputId) as HTMLInputElement;

    if (!input || !(window as any).google) return;

    const autocomplete = new (window as any).google.maps.places.Autocomplete(input);
    autocomplete.setFields(['formatted_address']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place.formatted_address);
    });
  }, [inputId, onPlaceSelected]);
}
