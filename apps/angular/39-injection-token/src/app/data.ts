import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;
export const TIMER_VALUE = new InjectionToken<number>('DEFAULT_TIMER');
