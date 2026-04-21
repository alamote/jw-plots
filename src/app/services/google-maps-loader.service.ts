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

  readonly loaded = this.loadedSignal.asReadonly();
  readonly apiKeyConfigured = environment.googleMapsApiKey.trim().length > 0;

  load(): void {
    if (this.loadedSignal() || this.attemptedSignal() || !this.apiKeyConfigured) {
      return;
    }

    this.attemptedSignal.set(true);

    if (window.google?.maps) {
      this.loadedSignal.set(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.loadedSignal.set(true);
    document.head.appendChild(script);
  }
}
