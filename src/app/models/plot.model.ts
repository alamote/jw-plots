export type PlotStatus = 'available' | 'booked' | 'processed';

export interface PlotPoint {
  lat: number;
  lng: number;
}

export interface Plot {
  id: string;
  territoryNumber: string;
  name: string;
  area: string;
  city: string;
  notes: string;
  priority: 'normal' | 'high' | 'urgent';
  status: PlotStatus;
  assignee: string | null;
  polygon: PlotPoint[];
  updatedAt: string;
}
