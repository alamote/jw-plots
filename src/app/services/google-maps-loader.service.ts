/// <reference types="google.maps" />

import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

declare global {
  interface Window {
    google?: typeof google;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private readonly loadedSignal = signal(false);
  private readonly attemptedSignal = signal(false);
  private loadPromise: Promise<typeof google> | null = null;

  readonly loaded = this.loadedSignal.asReadonly();
  readonly apiKeyConfigured = environment.googleMapsApiKey.trim().length > 0;

  load(): Promise<typeof google> {
    if (!this.apiKeyConfigured) {
      return Promise.reject(new Error('Google Maps API key is not configured.'));
    }

    if (window.google?.maps) {
      this.loadedSignal.set(true);
      return Promise.resolve(window.google);
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.attemptedSignal.set(true);
    this.loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.maps) {
          this.loadedSignal.set(true);
          resolve(window.google);
          return;
        }

        reject(new Error('Google Maps API loaded without google.maps.'));
      };
      script.onerror = () => reject(new Error('Failed to load Google Maps API.'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}
