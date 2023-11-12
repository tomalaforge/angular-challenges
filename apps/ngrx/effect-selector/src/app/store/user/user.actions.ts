import { createActionGroup, props } from '@ngrx/store';
import { User } from './user.model';

export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    loadUsersSuccess: props<{ user: User }>(),
    loadUsersFailure: props<{ error: any }>(),
  },
});
