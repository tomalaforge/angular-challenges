import { createSelector } from '@ngrx/store';
import {
  Activity,
  ActivityTeachers,
  ActivityType,
  Person,
} from '../activity/activity.model';
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

const selectTeachersMap = createSelector(selectStatuses, (statuses) => {
  const teachersMap = new Map<ActivityType, Person[]>();
  statuses.forEach((s) => teachersMap.set(s.name, s.teachers));
  return teachersMap;
});

export const selectActivities = createSelector(
  activityFeature.selectActivities,
  selectTeachersMap,
  (activities, teachersMap): ActivityTeachers[] =>
    activities.map((activity) => ({
      ...activity,
      eligibleTeachers: teachersMap.get(activity.type) ?? [],
    })),
);
