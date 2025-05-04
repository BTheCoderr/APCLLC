'use client';

import { useEffect } from 'react';

// This component registers the service worker for PWA functionality
export default function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered: ', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed: ', error);
          });
      });
    }
  }, []);

  // This is a client component that doesn't render anything
  return null;
} 