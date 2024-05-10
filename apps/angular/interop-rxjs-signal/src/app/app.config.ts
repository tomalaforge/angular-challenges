import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  QueryClient,
  provideQueryClient,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(
      [
        {
          path: '',
          pathMatch: 'full',
          loadComponent: () => import('./list/photos.component'),
        },
        {
          path: 'detail',
          loadComponent: () => import('./detail/detail.component'),
        },
        {
          path: '**',
          redirectTo: '',
        },
      ],
      withComponentInputBinding(),
    ),
    provideQueryClient(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
    ),
  ],
};
