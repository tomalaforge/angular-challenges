import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideToken('main-shell-token')],
};
