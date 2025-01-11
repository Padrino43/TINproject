import { CanLoadFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authLoadGuard: CanLoadFn = (
  route: Route,
  segments: UrlSegment[],
) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/login']);
};
