import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DEFAULT_TIMER } from './data';

export const TIMER_CONFIG = new InjectionToken<number>('timer', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'video' },
      { path: 'video', loadComponent: () => import('./video.component') },
      { path: 'phone', loadComponent: () => import('./phone.component') },
    ]),
  ],
};
