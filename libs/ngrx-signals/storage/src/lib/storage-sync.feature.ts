import { effect, Signal } from '@angular/core';
import { signalStoreFeature, type, withHooks } from '@ngrx/signals';

export function withStorageSync<State extends Record<string, unknown>>(config: {
  key: string;
  syncSlices: Array<keyof State>;
  storageFactory?: () => Storage;
}) {
  const { key, syncSlices, storageFactory = () => localStorage } = config;

  return signalStoreFeature(
    { state: type<State>() },
    withHooks({
      onInit(store) {
        const storage = storageFactory();

        const stateStr = storage.getItem(key);
        if (stateStr) {
          const state = JSON.parse(stateStr);
          store.$update(state);
        }

        const slices = syncSlices.reduce(
          (acc, key) => ({ ...acc, [key]: store[key] }),
          {}
        ) as Record<string, Signal<unknown>>;

        effect(() => {
          const state = Object.keys(slices).reduce(
            (acc, key) => ({
              ...acc,
              [key]: slices[key](),
            }),
            {}
          );

          storage.setItem(key, JSON.stringify(state));
        });
      },
    })
  );
}
