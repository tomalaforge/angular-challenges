import { HttpClientModule } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';

import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAngularQuery(new QueryClient()),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
