import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { deepEqual } from './utils';

type AddressState = {
  street: string;
  zipCode: string;
  city: string;
};

type JobState = {
  title: string;
  salary: number;
};

type UserState = {
  name: string;
  note: string;
  address: AddressState;
  job: JobState;
};

const initialState: UserState = {
  name: 'Bob',
  address: {
    street: '',
    zipCode: '',
    city: '',
  },
  note: '',
  job: {
    title: '',
    salary: 0,
  },
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    address: computed(() => store.address(), {
      equal: (a, b) => deepEqual(a, b),
    }),
    job: computed(() => store.job(), { equal: (a, b) => deepEqual(a, b) }),
  })),
  withMethods((store) => ({
    update(data: UserState): void {
      patchState(store, data);
    },
  })),
);
