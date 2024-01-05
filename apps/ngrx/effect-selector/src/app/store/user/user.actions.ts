import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction('[User] Load User');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ user: User }>(),
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: unknown }>(), // @typescript-eslint/no-explicit-any
);

/*

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load User': emptyProps(),
    'Load Users Success': props<{ user: User }>(),
    'Load Users Failure': props<{ error: unknown }>(),
  },
});

*/
