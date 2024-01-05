import { createAction, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const loadActivities = createAction('[AppComponent] Load Activities'); // problem here ???

export const loadActivitiesSuccess = createAction(
  '[Activity Effect] Load Activitys Success', // spelling -> need to check where it is also used
  props<{ activities: Activity[] }>(),
);

export const loadActivitiesFailure = createAction(
  '[Activity Effect] Load Activities Failure',
  props<{ error: unknown }>(), // unknown or never ?
);

// createActionGroup

/*
const activityActions = createActionGroup({
  source: 'Activity Effect',
  events: {
    // defining events with payload using the `props` function
    'Load Activitys Success':props<{ activities: Activity[] }>(),
    'Load Activities Failure': props<{ error: string }>(),
  },
});
*/
