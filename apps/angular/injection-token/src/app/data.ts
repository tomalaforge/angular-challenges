import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIME_SETTINGS = new InjectionToken<number>('settings for timer', {
  factory: () => DEFAULT_TIMER,
});
