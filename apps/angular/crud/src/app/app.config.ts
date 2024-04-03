import {
  HttpClientModule,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { errorHandleInterceptor } from './errorHandle.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [errorHandleInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors(INTERCEPTORS)),
  ],
};
