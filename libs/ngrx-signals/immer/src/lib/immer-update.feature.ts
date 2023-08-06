import {
  Prettify,
  SignalStateUpdater,
  signalStoreFeature,
  type,
  withMethods,
} from '@ngrx/signals';
import { produce } from 'immer';

export type ImmerUpdater<State> = (state: State) => void;

export function immerUpdater<State extends Record<string, unknown>>(
  updater: ImmerUpdater<State>
): SignalStateUpdater<State> {
  return (state) => produce(state, (draft) => updater(draft as State));
}

export type ImmerUpdate<State extends Record<string, unknown>> = {
  $update(
    ...updaters: Array<
      SignalStateUpdater<Prettify<State>> | ImmerUpdater<Prettify<State>>
    >
  ): void;
};

export function withImmerUpdate<State extends Record<string, unknown>>() {
  return signalStoreFeature(
    { state: type<State>() },
    withMethods(
      ({ $update }): ImmerUpdate<State> => ({
        $update(...updaters) {
          $update(...toImmerUpdaters(...updaters));
        },
      })
    )
  );
}

function toImmerUpdaters<State extends Record<string, unknown>>(
  ...updaters: Array<SignalStateUpdater<State> | ImmerUpdater<State>>
): SignalStateUpdater<State>[] {
  return updaters.map((updater) => {
    return typeof updater === 'function' ? immerUpdater(updater) : updater;
  });
}
