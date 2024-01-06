import { createSelector } from '@ngrx/store';
import { selectActivities } from '../activity/activity.reducer';
import { selectUser } from '../user/user.reducer';
import { Status } from './status.model';

const selectStatuses = createSelector(
  selectUser,
  selectActivities,
  (user, activities) => {
    // this code is taken from the status.effects file
    if (!user?.isAdmin) return [];

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

export const StatusSelectors = {
  selectStatuses,
};
