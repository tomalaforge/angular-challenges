import { ActivityType, Person } from '../activity/activity.model';

export interface Status {
  name: ActivityType;
  teachers: Person[];
}
