import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { NavigationService } from './navigation.service';

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
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const n = inject(NavigationService);
        return () => n.init();
      },
      multi: true,
    },
  ],
};
