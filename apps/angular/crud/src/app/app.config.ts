import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './error-handling/http-error-interceptor';
import { GlobalErrorHandler } from './error-handling/global-error-handler';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
       provide: ErrorHandler,
       useClass: GlobalErrorHandler
    },
  ],
};
