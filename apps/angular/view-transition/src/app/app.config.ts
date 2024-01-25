import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        { path: 'bar', loadComponent: () => import('./bar.component') },
        { path: 'foo', loadComponent: () => import('./foo.component') },
      ],
      withViewTransitions(),
    ),
  ],
};
