import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      [
        { path: '', loadComponent: () => import('./blog/blog.component') },
        {
          path: 'post/:id',
          loadComponent: () => import('./post/post.component'),
        },
      ],
      withComponentInputBinding(),
      withViewTransitions(),
    ),
  ],
};
