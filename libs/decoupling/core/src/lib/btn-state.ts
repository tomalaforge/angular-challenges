import { InjectionToken, Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

interface ButtonStateSignal {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE_TOKEN: InjectionToken<ButtonStateSignal> =
  new InjectionToken<ButtonStateSignal>('BUTTON_STATE_INJECTION_TOKEN');
