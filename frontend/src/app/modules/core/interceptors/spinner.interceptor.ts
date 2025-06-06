import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  spinner.showSpinner();
  return next(req).pipe(finalize(() => spinner.hide()));
};
