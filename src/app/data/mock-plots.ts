import { Plot } from '../models/plot.model';

export const MOCK_PLOTS: Plot[] = [
  {
    id: 'plot-101',
    territoryNumber: 'T-101',
    name: 'Podil Courtyards',
    area: 'Podilskyi District',
    city: 'Kropyvnytskyi',
    notes: 'Private homes around quiet side streets and two shared yards.',
    priority: 'high',
    status: 'available',
    assignee: null,
    updatedAt: '2026-04-20T10:00:00.000Z',
    polygon: [
      { lat: 48.5121, lng: 32.2524 },
      { lat: 48.5133, lng: 32.2545 },
      { lat: 48.5118, lng: 32.2564 },
      { lat: 48.5105, lng: 32.2542 }
    ]
  },
  {
    id: 'plot-102',
    territoryNumber: 'T-102',
    name: 'Central Market Blocks',
    area: 'Downtown',
    city: 'Kropyvnytskyi',
    notes: 'Mixed apartments and small shops near the market streets.',
    priority: 'normal',
    status: 'booked',
    assignee: 'Field User',
    updatedAt: '2026-04-21T07:30:00.000Z',
    polygon: [
      { lat: 48.5087, lng: 32.2615 },
      { lat: 48.5099, lng: 32.2634 },
      { lat: 48.5086, lng: 32.2651 },
      { lat: 48.5074, lng: 32.2632 }
    ]
  },
  {
    id: 'plot-103',
    territoryNumber: 'T-103',
    name: 'Kovalevka Homes',
    area: 'Kovalevka',
    city: 'Kropyvnytskyi',
    notes: 'Long residential stretch with several detached houses and gates.',
    priority: 'urgent',
    status: 'processed',
    assignee: 'Team A',
    updatedAt: '2026-04-18T15:10:00.000Z',
    polygon: [
      { lat: 48.4948, lng: 32.2507 },
      { lat: 48.4962, lng: 32.2521 },
      { lat: 48.4949, lng: 32.2543 },
      { lat: 48.4936, lng: 32.2528 }
    ]
  },
  {
    id: 'plot-104',
    territoryNumber: 'T-104',
    name: 'Nova Balashivka Towers',
    area: 'Nova Balashivka',
    city: 'Kropyvnytskyi',
    notes: 'Apartment cluster with coded entrances and inner courtyards.',
    priority: 'normal',
    status: 'available',
    assignee: null,
    updatedAt: '2026-04-19T11:45:00.000Z',
    polygon: [
      { lat: 48.5172, lng: 32.2798 },
      { lat: 48.5185, lng: 32.2822 },
      { lat: 48.5171, lng: 32.2841 },
      { lat: 48.5159, lng: 32.2817 }
    ]
  },
  {
    id: 'plot-105',
    territoryNumber: 'T-105',
    name: 'Fortecnyi Garden Streets',
    area: 'Fortecnyi District',
    city: 'Kropyvnytskyi',
    notes: 'Compact private sector territory suitable for a short evening shift.',
    priority: 'normal',
    status: 'available',
    assignee: null,
    updatedAt: '2026-04-21T09:15:00.000Z',
    polygon: [
      { lat: 48.5014, lng: 32.2702 },
      { lat: 48.5028, lng: 32.2718 },
      { lat: 48.5016, lng: 32.2737 },
      { lat: 48.5001, lng: 32.2721 }
    ]
  },
  {
    id: 'plot-106',
    territoryNumber: 'T-106',
    name: 'Railway Quarter',
    area: 'Station Area',
    city: 'Kropyvnytskyi',
    notes: 'Residential lanes near the station, mixed private and low-rise buildings.',
    priority: 'high',
    status: 'booked',
    assignee: 'Field User',
    updatedAt: '2026-04-21T12:10:00.000Z',
    polygon: [
      { lat: 48.4928, lng: 32.2309 },
      { lat: 48.4941, lng: 32.2327 },
      { lat: 48.4927, lng: 32.2345 },
      { lat: 48.4914, lng: 32.2328 }
    ]
  }
];
