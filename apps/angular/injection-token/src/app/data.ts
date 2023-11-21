import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = '1000';

export const DEFAULT_TIMER_TOKEN = new InjectionToken('TOKEN', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
