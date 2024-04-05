import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoaderService } from './loader.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();

  return next(req).pipe(
    finalize(() => loaderService.hideLoader()),
    catchError((error) => {
      console.log(error);
      loaderService.hideLoader();
      return of();
    }),
  );
};
