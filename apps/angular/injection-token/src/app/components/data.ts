import { InjectionToken, ValueProvider } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const timerValuesByType = {
  Phone: 2000,
  Video: DEFAULT_TIMER,
};

export const TIMER_VALUE_TOKEN = new InjectionToken<number>('TIMER_VALUE');

export const getTimerValueProvider = (value: number): ValueProvider => ({
  provide: TIMER_VALUE_TOKEN,
  useValue: value,
});
