import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
  { path: 'auth', redirectTo: '/auth/signin', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: async () =>
      (await import('../app/auth/auth.routes')).AuthRoutes,
  },
];
