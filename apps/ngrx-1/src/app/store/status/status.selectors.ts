import { createSelector } from '@ngrx/store';
import * as UserSelectors from '../user/user.selectors';
import * as ActivitySelectors from '../activity/activity.selectors';
import { Status } from './status.model';

export const selectStatuses = createSelector(
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
