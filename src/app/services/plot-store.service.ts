import { Injectable, computed, signal } from '@angular/core';

import { MOCK_PLOTS } from '../data/mock-plots';
import { Plot, PlotPoint, PlotStatus } from '../models/plot.model';
import { environment } from '../../environments/environment';

export interface CreatePlotInput {
  territoryNumber: string;
  name: string;
  area: string;
  city: string;
  notes: string;
  priority: Plot['priority'];
  polygon: PlotPoint[];
}

@Injectable({ providedIn: 'root' })
export class PlotStoreService {
  private readonly currentUser = environment.currentUser;
  private readonly plotsSignal = signal<Plot[]>(MOCK_PLOTS);
  private readonly selectedPlotIdSignal = signal<string>(MOCK_PLOTS[0]?.id ?? '');

  readonly plots = this.plotsSignal.asReadonly();
  readonly selectedPlotId = this.selectedPlotIdSignal.asReadonly();

  readonly selectedPlot = computed(() =>
    this.plotsSignal().find((plot) => plot.id === this.selectedPlotIdSignal()) ?? this.plotsSignal()[0] ?? null
  );

  readonly availablePlots = computed(() => this.plotsSignal().filter((plot) => plot.status === 'available'));
  readonly bookedPlots = computed(() => this.plotsSignal().filter((plot) => plot.status === 'booked'));
  readonly processedPlots = computed(() => this.plotsSignal().filter((plot) => plot.status === 'processed'));
  readonly myPlots = computed(() => this.plotsSignal().filter((plot) => plot.assignee === this.currentUser));

  readonly stats = computed(() => ({
    total: this.plotsSignal().length,
    available: this.availablePlots().length,
    booked: this.bookedPlots().length,
    processed: this.processedPlots().length
  }));

  readonly mapCenter = computed(() => {
    const selected = this.selectedPlot();
    if (selected?.polygon.length) {
      return selected.polygon[0];
    }

    return environment.defaultMapCenter;
  });

  selectPlot(plotId: string): void {
    this.selectedPlotIdSignal.set(plotId);
  }

  bookPlot(plotId: string): void {
    this.updatePlot(plotId, { status: 'booked', assignee: this.currentUser });
  }

  markProcessed(plotId: string): void {
    this.updatePlot(plotId, { status: 'processed' });
  }

  returnToPool(plotId: string): void {
    this.updatePlot(plotId, { status: 'available', assignee: null });
  }

  adminSetStatus(plotId: string, status: PlotStatus): void {
    const assignee = status === 'available' ? null : this.findPlot(plotId)?.assignee ?? 'Admin Team';
    this.updatePlot(plotId, { status, assignee });
  }

  addPlot(input: CreatePlotInput): void {
    const newPlot: Plot = {
      id: `plot-${crypto.randomUUID()}`,
      territoryNumber: input.territoryNumber,
      name: input.name,
      area: input.area,
      city: input.city,
      notes: input.notes,
      priority: input.priority,
      status: 'available',
      assignee: null,
      polygon: input.polygon,
      updatedAt: new Date().toISOString()
    };

    this.plotsSignal.update((plots) => [newPlot, ...plots]);
    this.selectedPlotIdSignal.set(newPlot.id);
  }

  private updatePlot(plotId: string, patch: Partial<Plot>): void {
    this.plotsSignal.update((plots) =>
      plots.map((plot) =>
        plot.id === plotId
          ? {
              ...plot,
              ...patch,
              updatedAt: new Date().toISOString()
            }
          : plot
      )
    );

    this.selectedPlotIdSignal.set(plotId);
  }

  private findPlot(plotId: string): Plot | undefined {
    return this.plotsSignal().find((plot) => plot.id === plotId);
  }
}
