import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { GlobalErrorHandler } from './shared/GlobalErrorHandler';
import { httpErrorInterceptor } from './http-error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
