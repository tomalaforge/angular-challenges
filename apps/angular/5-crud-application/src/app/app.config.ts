import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './core/error/GlobalErrorHandler.handler';
import { loadingInterceptor } from './core/services/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
