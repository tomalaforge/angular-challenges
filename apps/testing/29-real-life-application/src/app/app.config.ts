import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.route';
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(APP_ROUTES)],
};
