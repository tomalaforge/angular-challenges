import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations()],
};

/*
  As described here https://angular.dev/guide/animations#enabling-the-animations-module
  provideAnimations is used because we want to have animation happen immediately when app is loaded.
  use provideAnimationsAsync instead if you dont want to eagerly load animations module.
*/
