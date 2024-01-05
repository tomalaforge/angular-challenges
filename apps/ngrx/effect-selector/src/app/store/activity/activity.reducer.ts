import { createFeature, createReducer, on } from '@ngrx/store';
import { ActivityActions } from './activity.actions';
import { Activity } from './activity.model';

export interface ActivityState {
  activities: Activity[];
}

export const initialState: ActivityState = {
  activities: [],
};

// extraSelectors -> can't use outside selectors as parameters ?
// extraSelectors is for derived state from ActivityState only
// i.e. the length of the activities array

const activityFeature = createFeature({
  name: 'Activity',
  reducer: createReducer(
    initialState,
    on(ActivityActions.loadActivitiesSuccess, (state, { activities }) => ({
      ...state,
      activities,
    })),
    on(ActivityActions.loadActivitiesFailure, (state) => ({
      state,
      activities: [],
    })),
  ),
});

export const {
  name: activityFeatureKey,
  reducer: activityReducer,
  selectActivities,
} = activityFeature;
