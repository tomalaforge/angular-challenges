import { InjectionToken, Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export interface ButtonSignalState {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE = new InjectionToken<ButtonSignalState>(
  'ButtonState',
);
