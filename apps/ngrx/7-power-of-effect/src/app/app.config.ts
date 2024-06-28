import {
  FakeBackendService,
  PushService,
} from '@angular-challenges/power-of-effect/backend';
import { Push } from '@angular-challenges/power-of-effect/model';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  InjectionToken,
  inject,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTES } from './routes';

export const PUSH_NOTIFICATION = new InjectionToken<
  Observable<Push | undefined>
>('Push Notification', {
  factory() {
    return inject(PushService).notification$;
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
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
