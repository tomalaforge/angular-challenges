import { InjectionToken, Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export interface ButtonStateSignal {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE_TOKEN = new InjectionToken<ButtonStateSignal>(
  'button-state',
);
