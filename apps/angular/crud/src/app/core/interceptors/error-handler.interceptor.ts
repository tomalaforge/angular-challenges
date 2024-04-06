import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  toastService = inject(ToastService);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((err: Error) => {
        this.toastService.show(err.message);
        return throwError(() => err);
      }),
    );
  }
}
