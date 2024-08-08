import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hideLoader()),
      catchError((error) => {
        console.log(error);
        this.loaderService.hideLoader();
        return of();
      }),
    );
  }
}
