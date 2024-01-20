import { createReducer, on } from '@ngrx/store';
import * as ActivityActions from './activity.actions';
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
  on(ActivityActions.loadActivitiesSuccess, (state, { activities }) => ({
    ...state,
    activities,
  })),
  on(ActivityActions.loadActivitiesFailure, (state) => ({
    state,
    activities: [],
  })),
);
