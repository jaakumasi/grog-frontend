import { Routes } from '@angular/router';
import { GrocViewComponent } from './groc-view/groc-view.component';

export const GrocListRoutes: Routes = [
  { path: 'view', component: GrocViewComponent },
  { path: 'edit', component: GrocViewComponent },
  { path: 'checklist', component: GrocViewComponent },
];
