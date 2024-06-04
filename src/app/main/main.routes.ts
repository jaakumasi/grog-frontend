import { Route } from '@angular/router';
import { GeoComponent } from './geo/geo.component';
import { StatsComponent } from './stats/stats.component';

export const MainRoutes: Route[] = [
  { path: 'groc-list', redirectTo: '/main/groc-list/view', pathMatch: 'full' },
  {
    path: 'groc-list',
    loadChildren: async () =>
      (await import('./../main/groc-list/groc-list.routes')).GrocListRoutes,
  },
  { path: 'geo', component: GeoComponent },
  { path: 'stats', component: StatsComponent },
];
