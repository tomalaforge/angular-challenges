import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIMER_STATE = new InjectionToken<number>('TimerState', {
  factory: () => DEFAULT_TIMER,
});

export function getTimerProvider(useValue: number) {
  return { provide: TIMER_STATE, useValue };
}
