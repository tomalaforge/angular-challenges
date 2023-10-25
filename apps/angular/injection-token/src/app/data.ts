import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = new InjectionToken<number>(
  'Token to use timer value.',
  {
    providedIn: 'root',
    factory: () => 1000,
  }
);
