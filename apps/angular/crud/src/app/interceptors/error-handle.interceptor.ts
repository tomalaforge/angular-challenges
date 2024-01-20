import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export function ErrorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 404:
          return throwError(() => new Error('Resource unvailable'));
        case 401:
          return throwError(() => new Error('Unauthorized'));
        case 403:
          return throwError(() => new Error('Forbidden'));
        default:
          return throwError(
            () => new Error('Something bad happened; please try again later.'),
          );
      }
    }),
  );
}
