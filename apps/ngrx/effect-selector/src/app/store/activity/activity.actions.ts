import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const ActivityActions = createActionGroup({
  source: 'Activity Effect',
  events: {
    'Load Activities': emptyProps(),
    'Load Activities Success': props<{ activities: Activity[] }>(),
    'Load Activities Failure': props<{ error: unknown }>(),
  },
});
