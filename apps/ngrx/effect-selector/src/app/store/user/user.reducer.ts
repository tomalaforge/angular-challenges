import { createReducer, on } from '@ngrx/store';
import { UserApiActions } from './user.actions';
import { User } from './user.model';

export const userFeatureKey = 'user';

export interface UserState {
  user?: User;
}

export const initialState: UserState = {
  user: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(UserApiActions.loadUsersSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(UserApiActions.loadUsersFailure, (state) => ({
    ...state,
    user: undefined,
  }))
);
