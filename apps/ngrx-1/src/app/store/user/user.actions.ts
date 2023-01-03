import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ user: User }>()
);

const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

export const UserActions = {
  loadUsersSuccess,
  loadUsersFailure,
};
