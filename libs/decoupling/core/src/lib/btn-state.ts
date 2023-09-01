import { inject, InjectionToken, InjectOptions, Signal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export interface ButtonSignalState {
  state: Signal<ButtonState>;
}

export const BUTTON_STATE_TOKEN: InjectionToken<ButtonSignalState> =
  new InjectionToken<ButtonSignalState>('BUTTON_STATE_TOKEN');

export const injectButtonState = (options: InjectOptions) =>
  inject(BUTTON_STATE_TOKEN, options);
