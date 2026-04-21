/// <reference types="google.maps" />

import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

type GoogleMapsApi = typeof google & {
  maps: typeof google.maps & {
    importLibrary?: (name: string) => Promise<unknown>;
  };
};

const GOOGLE_MAPS_CALLBACK = '__jwPlotsGoogleMapsInit';
const GOOGLE_MAPS_SCRIPT_ID = 'jw-plots-google-maps-script';

declare global {
  interface Window {
    google?: GoogleMapsApi;
    [GOOGLE_MAPS_CALLBACK]?: () => void;
  }
}

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private readonly loadedSignal = signal(false);
  private readonly attemptedSignal = signal(false);
  private loadPromise: Promise<GoogleMapsApi> | null = null;

  readonly loaded = this.loadedSignal.asReadonly();
  readonly apiKeyConfigured = environment.googleMapsApiKey.trim().length > 0;

  load(): Promise<GoogleMapsApi> {
    if (!this.apiKeyConfigured) {
      return Promise.reject(new Error('Google Maps API key is not configured.'));
    }

    if (window.google?.maps?.Map) {
      this.loadedSignal.set(true);
      return Promise.resolve(window.google);
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.attemptedSignal.set(true);
    this.loadPromise = new Promise((resolve, reject) => {
      const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;
      const handleReady = () => {
        const googleApi = window.google;
        if (!googleApi?.maps?.Map) {
          reject(new Error('Google Maps API loaded without google.maps.Map.'));
          return;
        }

        this.loadedSignal.set(true);
        resolve(googleApi);
      };

      window[GOOGLE_MAPS_CALLBACK] = () => {
        handleReady();
        delete window[GOOGLE_MAPS_CALLBACK];
      };

      if (existingScript) {
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps API.')), {
          once: true
        });
        return;
      }

      const script = document.createElement('script');
      script.id = GOOGLE_MAPS_SCRIPT_ID;
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}` +
        `&loading=async&callback=${GOOGLE_MAPS_CALLBACK}&auth_referrer_policy=origin&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onerror = () => reject(new Error('Failed to load Google Maps API.'));
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}
