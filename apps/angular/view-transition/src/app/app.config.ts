import { ApplicationConfig, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ViewTransitionInfo,
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { CurrentTransitionService } from './service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      [
        { path: '', loadComponent: () => import('./blog/blog.component') },
        {
          path: 'post/:id',
          loadComponent: () => import('./post/post.component'),
        },
      ],
      withComponentInputBinding(),
      withViewTransitions({ onViewTransitionCreated }),
    ),
  ],
};

function onViewTransitionCreated(info: ViewTransitionInfo) {
  const currentTransitionService = inject(CurrentTransitionService);
  currentTransitionService.currentTransition.set(info);
  info.transition.finished.then(() => {
    currentTransitionService.currentTransition.set(null);
  });
  if (info.to.firstChild?.params['id']) {
    info.transition.ready.then(() => {
      document.documentElement.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      });
    });
  } else if (info.from.firstChild?.params['id']) {
    info.transition.ready.then(() => {
      document
        .getElementById(info.from.firstChild?.params['id'])
        ?.scrollIntoView({
          block: 'center',
          behavior: 'instant',
        });
    });
  }
}
