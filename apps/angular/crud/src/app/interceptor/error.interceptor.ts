import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor<T> implements HttpInterceptor {
  intercept(
    request: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    return next.handle(request).pipe(
      catchError(() => {
        const customError = {
          errorMessage: 'An error occurred while processing the request',
        };
        return throwError(() => customError);
      }),
    );
  }
}
