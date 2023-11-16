import { InjectOptions, InjectionToken, Signal, inject } from '@angular/core';

export type ButtonType = 'enabled' | 'disabled';

interface ButtonState {
  state: Signal<ButtonType>;
}

export const BUTTON_INJECTION_TOKEN: InjectionToken<ButtonState> =
  new InjectionToken<ButtonState>('BUTTON_INJECTION_TOKEN');

export const injectButtonState = (options: InjectOptions) =>
  inject(BUTTON_INJECTION_TOKEN, options);
