import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from 'libs/module-to-standalone/shell/src/lib/main-shell.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideToken('main-shell-token'),
  ],
};
