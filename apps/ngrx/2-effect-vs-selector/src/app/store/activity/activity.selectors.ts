import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Status } from '../status/status.model';
import { isUserAdmin } from '../user/user.selectors';
import { ActivityType } from './activity.model';
import { ActivityState, activityFeatureKey } from './activity.reducer';

export const selectActivityState =
  createFeatureSelector<ActivityState>(activityFeatureKey);

export const selectActivities = createSelector(
  selectActivityState,
  (state) => state.activities,
);

export const selectStatuses = createSelector(
  isUserAdmin,
  selectActivities,
  (isAdmin, activities) => {
    if (!isAdmin) {
      return [];
    }

    return activities.reduce((status: Status[], activity): Status[] => {
      const index = status.findIndex((s) => s.name === activity.type);
      if (index === -1) {
        return [
          ...status,
          { name: activity.type, teachers: [activity.teacher] },
        ];
      } else {
        status[index].teachers.push(activity.teacher);
        return status;
      }
    }, []);
  },
);

export const selectAllTeachersByActivityType = (name: ActivityType) =>
  createSelector(
    selectStatuses,
    (state) => state.find((s) => s.name === name)?.teachers ?? [],
  );
