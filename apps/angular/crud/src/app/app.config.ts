import {
  HttpClientModule,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { errorHandlerInterceptor } from './errorHandler.interceptor';

export const Interceptors: HttpInterceptorFn[] = [errorHandlerInterceptor];
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors(Interceptors)),
  ],
};
