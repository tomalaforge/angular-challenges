import { createActionGroup, props } from '@ngrx/store';
import { User } from './user.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users Success': props<{ user: User }>(),
    'Load Users Failure': props<{ error: unknown }>(),
  },
});
