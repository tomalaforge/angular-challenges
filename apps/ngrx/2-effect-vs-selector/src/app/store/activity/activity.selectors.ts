import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState, activityFeatureKey } from './activity.reducer';

const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);

export const ActivitySelectors = {
  selectActivities,
};
