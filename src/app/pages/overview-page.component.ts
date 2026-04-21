import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PlotMapComponent } from '../components/plot-map.component';
import { LocalizationService } from '../services/localization.service';
import { PlotStoreService } from '../services/plot-store.service';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [RouterLink, PlotMapComponent],
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss'
})
export class OverviewPageComponent {
  readonly i18n = inject(LocalizationService);
  readonly store = inject(PlotStoreService);
  readonly highlightPlots = computed(() => this.store.plots().slice(0, 3));
}
