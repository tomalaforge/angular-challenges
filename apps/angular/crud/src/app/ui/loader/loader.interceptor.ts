import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const loaderService = inject(LoaderService);

  loaderService.isLoading.set(true);

  return next(req).pipe(
    finalize(() => {
      loaderService.isLoading.set(false);
    }),
  );
};
