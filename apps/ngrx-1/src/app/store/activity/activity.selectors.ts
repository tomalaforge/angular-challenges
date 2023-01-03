import { createFeatureSelector, createSelector } from '@ngrx/store';
import { activityFeatureKey, ActivityState } from './activity.reducer';
import { selectStatusState } from '../status/status.selectors';
import { ActivityWithTeachers } from './activity.model';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities
);

export const selectActivitiesWithTeachers = createSelector(
  selectActivities,
  selectStatusState,
  (activities, statusState) => {
    return activities.map(
      (activity) =>
        ({
          teachers: statusState.teachersMap.get(activity.type) ?? [],
          ...activity,
        } as ActivityWithTeachers)
    );
  }
);
