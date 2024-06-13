import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

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
  withMethods((state) => ({
    update(user: User) {
      patchState(state, user);
    },
  })),
);
