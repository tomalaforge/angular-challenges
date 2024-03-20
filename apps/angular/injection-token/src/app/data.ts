import { InjectionToken } from '@angular/core';

const DEFAULT_TIMER_IN_MS = 1000;

export const TIMER = new InjectionToken<number>('timer', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER_IN_MS,
});
