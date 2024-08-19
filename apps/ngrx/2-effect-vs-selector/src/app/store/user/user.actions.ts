import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ user: User }>(),
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: unknown }>(),
);

export const updateUser = createAction('[User] Update User', props<User>());
export const updateUsersSuccess = createAction('[User] Update User Success');

export const updateUsersFailure = createAction(
  '[User] Update User Failure',
  props<{ error: unknown }>(),
);
