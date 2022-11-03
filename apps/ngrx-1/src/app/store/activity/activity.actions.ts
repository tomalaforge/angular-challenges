import { createAction, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const loadActivities = createAction('[AppComponent] Load Activitys');

export const loadActivitiesSuccess = createAction(
  '[Activity Effect] Load Activitys Success',
  props<{ activities: Activity[] }>()
);

export const loadActivitiesFailure = createAction(
  '[Activity] Load Activitys Failure',
  props<{ error: any }>()
);
