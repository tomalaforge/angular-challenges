import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User | undefined;
}

export const initialState: UserState = {
  user: undefined,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserActions.loadUsersSuccess, (state, { user }) => ({ ...state, user })),
    on(UserActions.loadUsersFailure, (state) => ({
      ...state,
      user: undefined,
    })),
  ),
});
