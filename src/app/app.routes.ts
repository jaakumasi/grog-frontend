import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GrocListComponent } from './main/groc-list/groc-list.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: 'auth', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: async () =>
      (await import('../app/auth/auth.routes')).AuthRoutes,
  },
  { path: 'main', redirectTo: '/main/groc-list', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: async () => (await import('./main/main.routes')).MainRoutes,
  },
];
