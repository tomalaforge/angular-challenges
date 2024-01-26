import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user/user.model';
import { UserSelectors } from '../user/user.selectors';
import { Activity, ActivityWithTeachers } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);

export const selectActivitiesWithTeachers = createSelector(
  selectActivities,
  UserSelectors.selectUser,
  (activities: Activity[], user: User | undefined): ActivityWithTeachers[] => {
    if (!activities || !user || !user.isAdmin) {
      return [];
    }

    const filterActivitiesByType = (type: string) =>
      activities.filter((ac) => ac.type === type);

    const mapActivityWithTeachers = (a: Activity): ActivityWithTeachers => {
      const filteredActivities = filterActivitiesByType(a.type);

      return {
        ...a,
        teachers: filteredActivities.map((ac) => ({ name: ac.teacher.name })),
      };
    };

    return activities.map(mapActivityWithTeachers);
  },
);

export const ActivitySelectors = {
  selectActivities,
  selectActivitiesWithTeachers,
};
