import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { appRoutes } from './main-shell.routes';

export const MainShellConfig: ApplicationConfig = {
  providers: [
    provideToken('main-shell-token'),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
  ],
};
