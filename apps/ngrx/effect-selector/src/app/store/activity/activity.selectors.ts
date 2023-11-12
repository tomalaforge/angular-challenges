import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectUser } from '../user/user.selectors';
import { ActivityWithSubstitutes } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities
);

export const selectActivitiesWithSubstituteTeachers = createSelector(
  selectActivities,
  selectUser,
  (activities, user) =>
    activities.map((activity) => ({
      ...activity,
      substitutes: user?.isAdmin
        ? activities
            .filter((a) => a.type === activity.type)
            .map((a) => a.teacher)
        : [],
    })) as ActivityWithSubstitutes[]
);
