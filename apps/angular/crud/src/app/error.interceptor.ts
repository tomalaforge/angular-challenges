import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, Observable, of } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hideLoader()),
      catchError((error) => {
        console.log(error);
        this.loaderService.hideLoader();
        return of();
      })
    );
  }
}
