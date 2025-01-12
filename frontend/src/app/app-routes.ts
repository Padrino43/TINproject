import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'contests',
    loadChildren: () =>
      import('./modules/contests/routes').then((m) => m.ROUTES_CONTESTS),
  },
  {
    path: 'contestants',
    loadChildren: () =>
      import('./modules/contestants/routes').then((m) => m.ROUTES_CONTESTANTS),
  },
];
