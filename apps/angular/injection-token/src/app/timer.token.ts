import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('timer');

export function provideTimer(value = 1000) {
  return {
    provide: TIMER,
    useValue: value,
  };
}
