import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { CustomErrorHandler } from './core/services/custom-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
};
