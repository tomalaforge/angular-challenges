import { InjectionToken } from '@angular/core';

const DEFAULT_TIMER = 1000;

export const TIMER = new InjectionToken('call timer', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
