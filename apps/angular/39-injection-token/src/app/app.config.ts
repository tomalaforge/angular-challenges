import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'video' },
      { path: 'video', loadComponent: () => import('./video.component') },
      { path: 'phone', loadComponent: () => import('./phone.component') },
    ]),
  ],
};

export class TimerConfig {
  /**
   * Deault timer
   */
  DEFAULT_TIMER = 1000;

  constructor(config?: Partial<TimerConfig>) {
    if (config) {
      Object.assign(this, config);
    }
  }
}
