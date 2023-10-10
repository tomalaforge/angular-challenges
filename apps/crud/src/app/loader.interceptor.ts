import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, finalize, of, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      }),
      catchError((error) => {
        this.loaderService.hideLoader();
        console.log(error);
        return of();
      })
    );
  }
}
