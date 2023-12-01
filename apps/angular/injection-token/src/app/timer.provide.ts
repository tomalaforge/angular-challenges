import { InjectionToken, ValueProvider } from '@angular/core';

export const TIMER_TOKEN = new InjectionToken<number>('timer');

export const getTimerProvider = (timer: number): ValueProvider => ({
  provide: TIMER_TOKEN,
  useValue: timer,
});
