import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../data-access/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.method);
  const loader = inject(LoaderService);
  if (req.method == 'GET') {
    loader.showLoader();
  }
  return next(req).pipe(finalize(() => loader.hideLoader()));
};
