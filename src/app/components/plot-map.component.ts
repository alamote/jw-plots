/// <reference types="google.maps" />

import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, effect, inject, input } from '@angular/core';

import { Plot } from '../models/plot.model';
import { LocalizationService } from '../services/localization.service';
import { GoogleMapsLoaderService } from '../services/google-maps-loader.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-plot-map',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './plot-map.component.html',
  styleUrl: './plot-map.component.scss'
})
export class PlotMapComponent implements AfterViewInit, OnDestroy {
  readonly plots = input.required<Plot[]>();
  readonly selectedPlotId = input<string | null>(null);
  @ViewChild('mapContainer') private mapContainer?: ElementRef<HTMLDivElement>;

  readonly i18n = inject(LocalizationService);
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  readonly mapReady = this.mapsLoader.loaded;
  readonly apiKeyConfigured = this.mapsLoader.apiKeyConfigured;
  mapLoadFailed = false;

  private map: google.maps.Map | null = null;
  private polygons: google.maps.Polygon[] = [];
  private destroyed = false;
  private initializationAttempts = 0;

  readonly center = computed(() => {
    const selectedPlot = this.selectedPlot();
    return selectedPlot?.polygon[0] ?? environment.defaultMapCenter;
  });

  readonly selectedPlot = computed(
    () => this.plots().find((plot) => plot.id === this.selectedPlotId()) ?? this.plots()[0] ?? null
  );

  readonly mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    styles: [
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'off' }] }
    ]
  };

  constructor() {
    effect(() => {
      this.selectedPlot();
      this.plots();
      this.syncMap();
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.apiKeyConfigured) {
      return;
    }

    try {
      await this.mapsLoader.load();
      if (this.destroyed) {
        return;
      }

      this.scheduleMapInitialization();
    } catch {
      this.mapLoadFailed = true;
    }
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.clearPolygons();
    this.map = null;
  }

  polygonOptions(plot: Plot): google.maps.PolygonOptions {
    const selected = plot.id === this.selectedPlotId();
    return {
      strokeColor: selected ? '#d95f02' : '#1f6a4b',
      strokeOpacity: 1,
      strokeWeight: selected ? 3 : 2,
      fillColor: selected ? '#f4c152' : '#4f9b78',
      fillOpacity: selected ? 0.35 : 0.2
    };
  }

  private initializeMap(): void {
    if (this.map || !this.mapContainer?.nativeElement) {
      return;
    }

    const container = this.mapContainer.nativeElement;
    if (!container.isConnected || container.clientWidth === 0 || container.clientHeight === 0) {
      return;
    }

    this.map = new google.maps.Map(container, {
      center: this.center(),
      zoom: 13,
      ...this.mapOptions
    });

    google.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(this.center());
    this.syncMap();
  }

  private syncMap(): void {
    if (!this.map) {
      return;
    }

    this.map.setCenter(this.center());
    this.clearPolygons();

    for (const plot of this.plots()) {
      const polygon = new google.maps.Polygon({
        paths: plot.polygon,
        ...this.polygonOptions(plot),
        map: this.map
      });

      this.polygons.push(polygon);
    }
  }

  private clearPolygons(): void {
    for (const polygon of this.polygons) {
      polygon.setMap(null);
    }

    this.polygons = [];
  }

  private scheduleMapInitialization(): void {
    if (this.destroyed || this.map) {
      return;
    }

    this.initializationAttempts += 1;
    requestAnimationFrame(() => {
      if (this.destroyed || this.map) {
        return;
      }

      this.initializeMap();
      if (!this.map && this.initializationAttempts < 10) {
        this.scheduleMapInitialization();
      }
    });
  }
}
