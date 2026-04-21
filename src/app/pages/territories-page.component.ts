import { Component, inject } from '@angular/core';

import { PlotMapComponent } from '../components/plot-map.component';
import { LocalizationService } from '../services/localization.service';
import { PlotStoreService } from '../services/plot-store.service';

@Component({
  selector: 'app-territories-page',
  standalone: true,
  imports: [PlotMapComponent],
  templateUrl: './territories-page.component.html',
  styleUrl: './territories-page.component.scss'
})
export class TerritoriesPageComponent {
  readonly i18n = inject(LocalizationService);
  readonly store = inject(PlotStoreService);
}
