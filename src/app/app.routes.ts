import { Routes } from '@angular/router';

import { AdminPageComponent } from './pages/admin-page.component';
import { OverviewPageComponent } from './pages/overview-page.component';
import { TerritoriesPageComponent } from './pages/territories-page.component';

export const routes: Routes = [
  { path: '', component: OverviewPageComponent },
  { path: 'territories', component: TerritoriesPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '**', redirectTo: '' }
];
