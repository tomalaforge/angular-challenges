import { ApplicationConfig } from '@angular/core';
import {
  ExtraOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';
import { appRoutes } from './app.routes';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withInMemoryScrolling(routerOptions))],
};
