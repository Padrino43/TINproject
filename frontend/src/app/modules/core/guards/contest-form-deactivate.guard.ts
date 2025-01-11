import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ContestFormComponent } from '../../contests/components/contest-form/contest-form.component';

export const contestFormDeactivateGuard: CanDeactivateFn<ContestFormComponent> = (
  component: ContestFormComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  if (component.contestForm.dirty) {
    return window.confirm('Czy na pewno chcesz opuścić formularz?');
  } else {
    return true;
  }
};
