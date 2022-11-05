import { createSelector } from '@ngrx/store';
import { ActivitySelectors } from '../activity/activity.selectors';
import { UserSelectors } from '../user/user.selectors';
import { Status } from './status.model';

const selectStatuses = createSelector(
  UserSelectors.isUserAdmin,
  ActivitySelectors.selectActivities,
  (isAdmin, activities) => {
    if (!isAdmin) return [];

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
);

export const StatusSelectors = {
  selectStatuses,
};
