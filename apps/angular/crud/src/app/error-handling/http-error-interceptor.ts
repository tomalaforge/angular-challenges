import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from '../data-access/loading.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  loadingService = inject(LoadingService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.error('HTTP Error:', error);
        }
        window.alert("There was an error processing. Please try again")
        this.loadingService.stopLoading()
        return of(error);
      })
    );
  }
}
