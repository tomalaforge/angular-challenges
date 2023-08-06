import { signal, WritableSignal } from '@angular/core';
import { DeepSignal, toDeepSignal } from './deep-signal';
import { defaultEqualityFn } from './select-signal';

export type SignalState<State extends Record<string, unknown>> =
  DeepSignal<State> & SignalStateUpdate<State>;

export type SignalStateUpdater<State extends Record<string, unknown>> =
  | Partial<State>
  | ((state: State) => Partial<State>);

export type SignalStateUpdate<State extends Record<string, unknown>> = {
  $update: (...updaters: SignalStateUpdater<State>[]) => void;
};

export function signalState<State extends Record<string, unknown>>(
  initialState: State
): SignalState<State> {
  const stateSignal = signal(initialState, { equal: defaultEqualityFn });
  const deepSignal = toDeepSignal(stateSignal.asReadonly());
  (deepSignal as SignalState<State>).$update =
    signalStateUpdateFactory(stateSignal);

  return deepSignal as SignalState<State>;
}

export function signalStateUpdateFactory<State extends Record<string, unknown>>(
  stateSignal: WritableSignal<State>
): SignalStateUpdate<State>['$update'] {
  return (...updaters) =>
    stateSignal.update((state) =>
      updaters.reduce(
        (currentState: State, updater) => ({
          ...currentState,
          ...(typeof updater === 'function' ? updater(currentState) : updater),
        }),
        state
      )
    );
}
