import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideTanStackQuery(new QueryClient())],
};
