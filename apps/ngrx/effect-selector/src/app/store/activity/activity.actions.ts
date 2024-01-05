import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Activity } from './activity.model';

/*
export const loadActivities = createAction('[AppComponent] Load Activities'); // problem here ???

export const loadActivitiesSuccess = createAction(
  '[Activity Effect] Load Activitys Success', // spelling -> need to check where it is also used
  props<{ activities: Activity[] }>(),
);

export const loadActivitiesFailure = createAction(
  '[Activity Effect] Load Activities Failure',
  props<{ error: unknown }>(), // unknown or never ?
);
*/

export const ActivityActions = createActionGroup({
  source: 'Activity Effect',
  events: {
    'Load Activities': emptyProps(),
    'Load Activities Success': props<{ activities: Activity[] }>(),
    'Load Activities Failure': props<{ error: string }>(),
  },
});
