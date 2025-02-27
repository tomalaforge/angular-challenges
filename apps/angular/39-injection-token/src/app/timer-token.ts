import { InjectionToken } from '@angular/core';

export const TIMER_VALUE = new InjectionToken<number>('TIMER_VALUE');

export const getTimerProvider = (value: number) => ({
  provide: TIMER_VALUE,
  useValue: value,
});
