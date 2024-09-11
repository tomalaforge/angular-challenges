import { createSelector } from '@ngrx/store';
import { Status } from '../status/status.model';
import { StatusSelectors } from '../status/status.selectors';
import { Activity } from './activity.model';
import { ActivitySelectors } from './activity.selectors';

const selectActivitiesWithStatuses = createSelector(
  ActivitySelectors.selectActivities,
  StatusSelectors.selectStatuses,
  (activities: Activity[], statuses: Status[] | undefined) => {
    return activities.map(({ name, teacher, type }) => {
      const availableTeachers =
        statuses?.find((status) => status.name === type)?.teachers ?? [];

      return {
        name,
        mainTeacher: teacher,
        type,
        availableTeachers,
      };
    });
  },
);

export const ActivityStatusSelector = {
  selectActivitiesWithStatuses,
};
