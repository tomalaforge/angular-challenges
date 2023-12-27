import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectUser } from '../user/user.selectors';
import { ActivityWithTeachers } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);

export const selectActivitiesWithTeachers = createSelector(
  selectActivities,
  selectUser,
  (activities, user) => {
    if (!user?.isAdmin) return [];
    return activities.map((a) => {
      return {
        ...a,
        teachers: activities
          .filter((ac) => ac.type === a.type)
          .map((ac) => {
            return { name: ac.teacher.name };
          }),
      } as ActivityWithTeachers;
    });
  },
);
