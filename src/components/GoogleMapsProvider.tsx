'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  if (!isLoaded) return <div className="text-center p-10">Loading Google Maps...</div>;

  return <>{children}</>;
}
