import { ApplicationConfig } from '@angular/core';
import { withInMemoryScrolling } from '@angular/router';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled' }),
    ),
  ],
};
