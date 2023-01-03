import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityFeatureKey, ActivityState } from './activity.reducer';

const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities
);

export const ActivitySelectors = {
  selectActivities,
};
