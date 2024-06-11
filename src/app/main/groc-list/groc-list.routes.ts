import { Routes } from '@angular/router';
import { GrocViewComponent } from './groc-view/groc-view.component';
import { GrocEditComponent } from './groc-edit/groc-edit.component';

export const GrocListRoutes: Routes = [
  { path: 'view', component: GrocViewComponent },
  { path: 'new', component: GrocEditComponent },
  { path: 'edit', component: GrocEditComponent },
// { path: 'checklist', component: GrocChecklistComponent },
];
