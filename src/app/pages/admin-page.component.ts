import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PlotMapComponent } from '../components/plot-map.component';
import { PlotPoint, PlotStatus } from '../models/plot.model';
import { LocalizationService } from '../services/localization.service';
import { PlotStoreService } from '../services/plot-store.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [ReactiveFormsModule, PlotMapComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  readonly i18n = inject(LocalizationService);
  readonly store = inject(PlotStoreService);
  private readonly formBuilder = inject(FormBuilder);

  readonly plotForm = this.formBuilder.group({
    territoryNumber: ['', Validators.required],
    name: ['', Validators.required],
    area: ['', Validators.required],
    city: [environment.defaultCity, Validators.required],
    notes: [''],
    priority: this.formBuilder.nonNullable.control<'normal' | 'high' | 'urgent'>('normal'),
    polygonText: [
      '[\n  { "lat": 49.8421, "lng": 24.0317 },\n  { "lat": 49.8434, "lng": 24.0331 },\n  { "lat": 49.8420, "lng": 24.0350 },\n  { "lat": 49.8408, "lng": 24.0336 }\n]'
    ]
  });

  addPlot(): void {
    if (this.plotForm.invalid) {
      this.plotForm.markAllAsTouched();
      return;
    }

    const polygon = this.parsePolygon(this.plotForm.controls.polygonText.value ?? '[]');
    if (!polygon.length) {
      this.plotForm.controls.polygonText.setErrors({ invalidPolygon: true });
      return;
    }

    this.store.addPlot({
      territoryNumber: this.plotForm.controls.territoryNumber.value ?? '',
      name: this.plotForm.controls.name.value ?? '',
      area: this.plotForm.controls.area.value ?? '',
      city: this.plotForm.controls.city.value ?? '',
      notes: this.plotForm.controls.notes.value ?? '',
      priority: this.plotForm.controls.priority.value,
      polygon
    });

    this.plotForm.patchValue({
      territoryNumber: '',
      name: '',
      area: '',
      notes: '',
      priority: 'normal'
    });
  }

  setStatus(plotId: string, status: PlotStatus): void {
    this.store.adminSetStatus(plotId, status);
  }

  private parsePolygon(rawPolygon: string): PlotPoint[] {
    try {
      const parsed = JSON.parse(rawPolygon) as PlotPoint[];
      return parsed.filter(
        (point) => typeof point?.lat === 'number' && Number.isFinite(point.lat) && typeof point?.lng === 'number'
      );
    } catch {
      return [];
    }
  }
}
