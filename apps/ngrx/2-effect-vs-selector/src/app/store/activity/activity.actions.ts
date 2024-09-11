import { createActionGroup, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const ActivityActions = createActionGroup({
  source: 'Activities',
  events: {
    'Load Activities Success': props<{ activities: Activity[] }>(),
    'Load Activities Failure': props<{ error: unknown }>(),
  },
});
