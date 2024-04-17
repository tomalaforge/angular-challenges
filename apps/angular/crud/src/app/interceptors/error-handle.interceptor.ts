import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const errorHandleInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      switch (error.status) {
        case 404:
          return throwError(() => new Error('Resource is not found'));
        case 401:
          return throwError(() => new Error('Unauthorized'));
        case 403:
          return throwError(() => new Error('Forbidden'));
        default:
          return throwError(() => new Error('Something wrong happened'));
      }
    }),
  );
};
