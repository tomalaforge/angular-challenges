import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

interface User {
  name: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  note: string;
  title: string;
  salary: number;
}

export const UserStore = signalStore(
  withState<User>({
    name: 'Bob',
    address: {
      street: '',
      zipCode: '',
      city: '',
    },
    note: '',
    title: '',
    salary: 0,
  }),
  withComputed((state) => ({
    street: computed(() => state.address.street()),
    zipCode: computed(() => state.address.zipCode()),
    city: computed(() => state.address.city()),
  })),
  withMethods((state) => ({
    update(user: User) {
      patchState(state, user);
    },
  })),
);
