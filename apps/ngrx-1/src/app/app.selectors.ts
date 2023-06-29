import { createSelector } from '@ngrx/store';
import { selectUserIsAdmin } from './store/user/user.selectors';
import { selectActivities } from './store/activity/activity.selectors';
import { ActivityType, Person } from './store/activity/activity.model';

const selectTeachersByActivityMap = createSelector(
  selectUserIsAdmin,
  selectActivities,
  (isAdmin, activities) => {
    if (!isAdmin) return {} as Record<ActivityType, Person[]>;

    return activities.reduce((statusMap, activity) => {
      const status = statusMap[activity.type];
      if (status) {
        status.push(activity.teacher);
      } else {
        statusMap[activity.type] = [activity.teacher];
      }
      return statusMap;
    }, {} as Record<ActivityType, Person[]>);
  }
);

export const selectVm = createSelector(
  selectActivities,
  selectTeachersByActivityMap,
  (activities, statusesMap) => {
    return activities.map((activity) => ({
      ...activity,
      teachers: statusesMap[activity.type],
    }));
  }
);
