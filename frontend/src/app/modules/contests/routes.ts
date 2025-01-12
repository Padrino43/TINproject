import { Routes } from '@angular/router';
import { ContestsComponent } from './contests.component';
import { ContestComponent } from './components/contest/contest.component';
import { ContestFormComponent } from './components/contest-form/contest-form.component';
import {authLoadGuard} from "../core/guards/auth-load.guard";
import {contestFormDeactivateGuard} from "../core/guards/contest-form-deactivate.guard";
import {
  ContestantAddToContestFormComponent
} from "./components/contest/contestant-add-to-contest-form/contestant-add-to-contest-form.component";

export const ROUTES_CONTESTS: Routes = [
  {
    path: '',
    component: ContestsComponent,
  },
  {
    path: 'add',
    component: ContestFormComponent,
    canMatch: [authLoadGuard],
  },
  {
    path: ':id/add',
    component: ContestantAddToContestFormComponent,
    canMatch: [authLoadGuard],
  },
  {
    path: ':id',
    component: ContestComponent
  },
];
