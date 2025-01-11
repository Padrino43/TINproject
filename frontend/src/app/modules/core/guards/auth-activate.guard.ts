import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authActivateGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/login']);
};
