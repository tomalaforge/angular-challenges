import { createReducer, on } from '@ngrx/store';
import { ActivitiesApiActions } from './activity.actions';
import { Activity } from './activity.model';

export const activityFeatureKey = 'Activity';

export interface ActivityState {
  activities: Activity[];
}

export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = createReducer(
  initialState,
  on(ActivitiesApiActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities,
  })),
  on(ActivitiesApiActions.loadActivitiesFailure, (state) => ({
    state,
    activities: [],
  }))
);
