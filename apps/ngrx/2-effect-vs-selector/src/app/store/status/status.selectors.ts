import { createSelector } from '@ngrx/store';
import { Activity } from '../activity/activity.model';
import { ActivitySelectors } from '../activity/activity.selectors';
import { UserSelectors } from '../user/user.selectors';
import { Status } from './status.model';

export const selectStatuses = createSelector(
  UserSelectors.isUserAdmin,
  ActivitySelectors.selectActivities,
  (isAdmin, activities: Activity[]) => {
    if (!isAdmin) {
      return;
    }

    return activities.reduce(
      (accumulator: Status[], activity: Activity): Status[] => {
        const existingStatus = accumulator.find(
          (status) => status.name === activity.type,
        );

        if (existingStatus) {
          existingStatus.teachers.push(activity.teacher);
        } else {
          accumulator.push({
            name: activity.type,
            teachers: [activity.teacher],
          });
        }

        return accumulator;
      },
      [],
    );
  },
);

export const StatusSelectors = {
  selectStatuses,
};
