import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../model/task';

export const taskActions = createActionGroup({
  source: 'Task Page',
  events: {
    'Load Tasks Action': emptyProps(),
    'Load Tasks Success': props<{ list: Task[] }>(),
    'Upd Task Action': props<{ task: Task }>(),
    'Upd Task Success': props<{ task: Task }>(),
    'Del Task Action': props<{ task: Task }>(),
    'Del Task Success': props<{ task: Task }>(),
  },
});
