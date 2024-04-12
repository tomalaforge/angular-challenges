import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { httpErrorInterceptor, httpPendingInterceptor } from './interceptors';
import { provideGlobalLoading } from './loading.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpPendingInterceptor, httpErrorInterceptor]),
    ),
    provideGlobalLoading(),
  ],
};
