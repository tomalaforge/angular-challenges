import {
  patchState,
  signalState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';

// @Injectable({ providedIn: 'root' })

type User = {
  name: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  note: string;
  title: string;
  salary: number;
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(
    signalState<User>({
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
  ),
  withMethods((store) => ({
    update(user: User): void {
      patchState(store, user);
    },
  })),
);
