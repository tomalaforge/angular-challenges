import { InjectionToken, Provider } from '@angular/core';

export const TIMER_VALUE = new InjectionToken<number>('DEFAULT_TIMER');

export const timerProvider: Provider = { provide: TIMER_VALUE, useValue: 1000 };
