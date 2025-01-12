import {ContestantComponent} from "./components/contestant/contestant.component";
import {ContestantFormComponent} from "./components/contestant-form/contestant-form.component";
import {authLoadGuard} from "../core/guards/auth-load.guard";
import {Routes} from "@angular/router";
import {ContestantsComponent} from "./contestants.component";

export const ROUTES_CONTESTANTS: Routes = [
  {
    path: '',
    component: ContestantsComponent,
  },
  {
    path: 'add',
    component: ContestantFormComponent,
    canMatch: [authLoadGuard],
  },
  { path: ':id', component: ContestantComponent },
];
