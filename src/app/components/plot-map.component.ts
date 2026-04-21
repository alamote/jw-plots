import { JsonPipe } from '@angular/common';
import { Component, OnInit, computed, inject, input } from '@angular/core';
import { GoogleMap, MapPolygon } from '@angular/google-maps';

import { Plot } from '../models/plot.model';
import { LocalizationService } from '../services/localization.service';
import { GoogleMapsLoaderService } from '../services/google-maps-loader.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-plot-map',
  standalone: true,
  imports: [GoogleMap, MapPolygon, JsonPipe],
  templateUrl: './plot-map.component.html',
  styleUrl: './plot-map.component.scss'
})
export class PlotMapComponent implements OnInit {
  readonly plots = input.required<Plot[]>();
  readonly selectedPlotId = input<string | null>(null);

  readonly i18n = inject(LocalizationService);
  private readonly mapsLoader = inject(GoogleMapsLoaderService);

  readonly mapReady = this.mapsLoader.loaded;
  readonly apiKeyConfigured = this.mapsLoader.apiKeyConfigured;

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

  ngOnInit(): void {
    if (this.apiKeyConfigured) {
      this.mapsLoader.load();
    }
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
}
