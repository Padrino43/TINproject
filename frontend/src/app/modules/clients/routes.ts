import { Routes } from '@angular/router';
import { ContestsComponent } from './contests.component';
import { ContestComponent } from './components/contest/contest.component';
import { ContestFormComponent } from './components/contest-form/contest-form.component';
import { contestFormDeactivateGuard } from '../core/guards/contest-form-deactivate.guard';

export const ROUTES_CLIENTS: Routes = [
  {
    path: '',
    component: ContestsComponent,
  },
  {
    path: 'add',
    component: ContestFormComponent,
    canDeactivate: [contestFormDeactivateGuard],
  },
  { path: ':id', component: ContestComponent },
];
