import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, catchError, delay, finalize } from 'rxjs';
import { LOADING } from './loading.token';

export const httpPendingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const loading = inject(LOADING);
  loading.set(true);

  return next(req).pipe(
    delay(500), // Minimum delay of 500ms to avoid "flash"
    finalize(() => loading.set(false)),
  );
};

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP error interceptor:', error);

      return EMPTY;
    }),
  );
};
