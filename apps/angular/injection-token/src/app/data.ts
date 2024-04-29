import { InjectionToken } from '@angular/core';

const DEFAULT_TIMER = 1000;

export const TIMER_TOKEN = new InjectionToken('timer', {
  factory: () => DEFAULT_TIMER,
});

export default TIMER_TOKEN;
