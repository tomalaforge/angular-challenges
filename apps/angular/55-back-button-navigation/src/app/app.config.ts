import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        closeOnNavigation: false,
      },
    },
  ],
};
