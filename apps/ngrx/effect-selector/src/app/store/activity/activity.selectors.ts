import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);
