import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(
      [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () => import('./photos/list/photos.component'),
        },
        {
          path: 'detail',
          loadComponent: () => import('./photos/detail/detail.component'),
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
      withComponentInputBinding()
    ),
  ],
};
