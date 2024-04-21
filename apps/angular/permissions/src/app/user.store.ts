import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  Role,
  User,
  admin,
  client,
  everyone,
  manager,
  reader,
  readerAndWriter,
  writer,
} from './user.model';

type UserState = {
  authenticatedUser: User | null;
  userRoles: User[];
};

export const initialState: UserState = {
  authenticatedUser: null,
  userRoles: [
    admin,
    manager,
    reader,
    writer,
    client,
    readerAndWriter,
    everyone,
  ],
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => {
    return {
      updateUser: (user: User | null) => {
        patchState(state, { authenticatedUser: user });
      },
      hasRoleSuperAdmin: (flag: boolean) => {
        return state.authenticatedUser()?.isAdmin && flag;
      },
      hasRole: (roles: Role[]) => {
        const userRoles = state.authenticatedUser()?.roles;

        //everyone role
        if (
          !userRoles?.length &&
          !roles.length &&
          !state.authenticatedUser()?.isAdmin
        ) {
          return true;
        }

        return userRoles?.some((y) => roles.find((x) => x === y));
      },
    };
  }),
);
