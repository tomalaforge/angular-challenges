import { InjectionToken, WritableSignal } from '@angular/core';

export type ButtonState = 'enabled' | 'disabled';

export interface State {
  state: WritableSignal<ButtonState>;
}

export const BUTTON_STATE_TOKEN = new InjectionToken<State>('BUTTON_STATE');
