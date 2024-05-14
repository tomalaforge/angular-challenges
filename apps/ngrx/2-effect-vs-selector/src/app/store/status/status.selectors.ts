import { createSelector } from '@ngrx/store';
import { Activity, ActivityType } from '../activity/activity.model';
import { activityFeature } from '../activity/activity.reducer';
import { User } from '../user/user.model';
import { userFeature } from '../user/user.reducer';
import { Status } from './status.model';

const selectStatuses = createSelector(
  userFeature.selectUser,
  activityFeature.selectActivities,
  (user: User | undefined, activities: Activity[]) => {
    if (user?.isAdmin) {
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
    }
    return [];
  },
);

export const selectAllTeachersByActivityType = (name: ActivityType) =>
  createSelector(selectStatuses, (statuses) => {
    const teachersMap = new Map();
    statuses.forEach((s) => teachersMap.set(s.name, s.teachers));

    return teachersMap.get(name) ?? [];
  });
