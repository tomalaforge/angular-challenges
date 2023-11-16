import { inject, InjectionToken, InjectOptions, Signal } from '@angular/core';

export type State = 'enabled' | 'disabled';

export interface SignalState {
  state: Signal<State>;
}

export const STATE_TOKEN: InjectionToken<SignalState> =
  new InjectionToken<SignalState>('STATE_TOKEN');

export const injectState = (options: InjectOptions) =>
  inject(STATE_TOKEN, options);
