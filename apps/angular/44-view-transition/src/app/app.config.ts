import { ApplicationConfig, inject } from '@angular/core';
import {
  ViewTransitionInfo,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
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
      // My attempt at level 3 - I'm not sure what 'the correct Y location' is
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions({
        onViewTransitionCreated: (transitionInfo: ViewTransitionInfo): void => {
          const postService = inject(PostService);

          // set the activeId when transitioning to or from a post
          const activeId =
            transitionInfo.to.firstChild?.params['id'] ||
            transitionInfo.from.firstChild?.params['id'];
          postService.activeId.set(activeId);

          // clear the activeId when the transition is finished
          transitionInfo.transition.finished.then(() => {
            postService.activeId.set(undefined);
          });
        },
      }),
    ),
  ],
};
