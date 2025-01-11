import { Routes } from '@angular/router';
import { authLoadGuard } from './modules/core/guards/auth-load.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'contests',
    loadChildren: () =>
      import('./modules/clients/routes').then((m) => m.ROUTES_CLIENTS),
    canLoad: [authLoadGuard],
  },
];
