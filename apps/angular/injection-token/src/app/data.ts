import { InjectionToken } from '@angular/core';

export const TIMER_TOKEN = new InjectionToken<number>('TIMER', {
  factory: () => 1000,
});

// export const DEFAULT_TIMER = 1000;
// could use factory: () => DEFAULT_TIMER
