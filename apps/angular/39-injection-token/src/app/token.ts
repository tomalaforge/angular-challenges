import { InjectionToken } from '@angular/core';
import { TimerConfig } from './app.config';
import { DEFAULT_TIMER } from './data';

export const TIMER_TOKEN = new InjectionToken<TimerConfig>('TimerConfig', {
  providedIn: 'root',
  factory: () => new TimerConfig({ DEFAULT_TIMER }),
});
