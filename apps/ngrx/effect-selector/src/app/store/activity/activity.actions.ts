import { createActionGroup, props } from '@ngrx/store';
import { Activity } from './activity.model';

export const ActivitiesApiActions = createActionGroup({
  source: 'Activities API',
  events: {
    loadActivitiesSuccess: props<{ activities: Activity[] }>(),
    loadActivitiesFailure: props<{ error: any }>(),
  },
});
