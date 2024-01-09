import { FakeBackendService } from '@angular-challenges/ngrx-notification/backend';
import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppEffects } from './app.effects';
import { ROUTES } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideEffects([AppEffects]),
    provideRouter(ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(FakeBackendService);
        return () => service.start();
      },
    },
    provideAnimations(),
  ],
};

// the same notification service was shared by all components
/*
{
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: () => {
      const service = inject(NotificationService);
      return () => service.init();
    },
  },
*/

// you can dispatch actions inside the providers array.
// https://ngserve.io/ngrx-tutorial-handling-user-notifications-with/

/*
  {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [ Store ],
    useFactory: (store: Store<any>) => {
      return () => new Promise(resolve => {
        store.dispatch(new NotificationActions.WatchNotificationsAction());
        resolve();
      });
    }
  }
*/
