import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityFeatureKey, ActivityState } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities
);
