import { ApplicationConfig, inject } from '@angular/core';
import {
  ViewTransitionInfo,
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { PostService } from './post.service';

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
      withViewTransitions({
        onViewTransitionCreated: (transitionInfo: ViewTransitionInfo): void => {
          const postService = inject(PostService);
          const activeId =
            transitionInfo.to.firstChild?.params['id'] ||
            transitionInfo.from.firstChild?.params['id'];
          postService.activeId.set(activeId);
          transitionInfo.transition.finished.then(() => {
            postService.activeId.set(undefined);
          });
        },
      }),
    ),
  ],
};
