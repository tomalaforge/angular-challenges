import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ user: User }>(),
    'Load Users Failure': props<{ error: unknown }>(),
  },
});
