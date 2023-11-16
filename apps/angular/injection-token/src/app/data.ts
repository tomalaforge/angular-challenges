import { InjectionToken, Provider } from '@angular/core';

export const TIMER = new InjectionToken<number>('Timer delay');

export function provideTimer(useValue = 1000): Provider {
  return {
    provide: TIMER,
    useValue,
  };
}
