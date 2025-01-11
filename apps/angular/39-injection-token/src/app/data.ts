import { InjectionToken, ValueProvider } from '@angular/core';

export const TIMER = new InjectionToken<number>('default-timer');

export const getDefaultTimerProvider = (seconds = 1): ValueProvider => ({
  provide: TIMER,
  useValue: 1000 * seconds,
});
