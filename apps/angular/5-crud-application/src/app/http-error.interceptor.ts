import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
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
