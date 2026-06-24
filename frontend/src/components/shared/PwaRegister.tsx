'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      } else {
        // In development, unregister service workers to avoid stale HTML/JS caching issues
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
            console.log('[PWA] Unregistered stale service worker in development mode.');
          }
        });
      }
    }
  }, []);
  return null;
}

