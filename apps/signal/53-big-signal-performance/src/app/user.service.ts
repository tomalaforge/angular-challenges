import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
interface UserState {
  name: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  note: string;
  job: { title: string; salary: number };
}

const initialUserState = (): UserState => ({
  name: 'Bob',
  address: {
    street: '',
    zipCode: '',
    city: '',
  },
  note: '',
  job: { title: '', salary: 0 },
});

export const UserStore = signalStore(
  withState(initialUserState),
  withComputed((store) => ({
    address: computed(() => store.address(), {
      equal: (a, b) => checkEquality(a, b),
    }),
    job: computed(() => store.job(), {
      equal: (a, b) => checkEquality(a, b),
    }),
  })),
  withMethods((store) => ({
    update(user: UserState) {
      patchState(store, user);
    },
  })),
);

function checkEquality<T extends Record<string, string | number>>(
  a: T,
  b: T,
): boolean {
  for (const key in a) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}
