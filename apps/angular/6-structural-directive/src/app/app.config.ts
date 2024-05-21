import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './routes';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES)],
};
