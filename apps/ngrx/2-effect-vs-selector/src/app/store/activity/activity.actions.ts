import { createAction, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const loadActivities = createAction('[Activity Effect] Load Activities');

export const loadActivitiesSuccess = createAction(
  '[Activity Effect] Load Activities Success',
  props<{ activities: Activity[] }>(),
);

export const loadActivitiesFailure = createAction(
  '[Activity Effect] Load Activities Failure',
  props<{ error: unknown }>(),
);
