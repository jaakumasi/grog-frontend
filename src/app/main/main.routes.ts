import { Route } from '@angular/router';
import { GrocListComponent } from './groc-list/groc-list.component';
import { GeoComponent } from './geo/geo.component';
import { StatsComponent } from './stats/stats.component';

export const MainRoutes: Route[] = [
  { path: 'groc-list', component: GrocListComponent },
  { path: 'geo', component: GeoComponent },
  { path: 'stats', component: StatsComponent },
];
