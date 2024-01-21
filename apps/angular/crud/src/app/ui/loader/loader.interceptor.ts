import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

export function LoaderInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loaderService = inject(LoaderService);
  //loaderService.isLoading$.next(true);
  loaderService.isLoading$.set(true);
  return next(req).pipe(
    finalize(() => {
      //loaderService.isLoading$.next(false);
      loaderService.isLoading$.set(false);
    }),
  );
}
