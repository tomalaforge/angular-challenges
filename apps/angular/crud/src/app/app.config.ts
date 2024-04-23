import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';

import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAngularQuery(new QueryClient()),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
