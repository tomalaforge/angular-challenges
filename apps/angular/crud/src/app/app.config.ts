import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideAngularQuery(new QueryClient())],
};
