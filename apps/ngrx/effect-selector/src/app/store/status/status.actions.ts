import { createAction, props } from '@ngrx/store';
import { Status } from './status.model';

export const loadStatuses = createAction('[Status] Load Statuses');

export const loadStatusesSuccess = createAction(
  '[Status] Load Statuses Success',
  props<{ statuses: Status[] }>(),
);
