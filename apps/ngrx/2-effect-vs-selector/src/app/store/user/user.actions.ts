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
