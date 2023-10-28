import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('timer', {
  providedIn: 'root',
  factory: () => 1_000,
});
