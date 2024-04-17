import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITodo } from '../../interfaces/ITodo';

export const todoActions = createActionGroup({
  source: 'Todo Page',
  events: {
    'Load Todos Action': emptyProps(),
    'Load Todos Success Action': props<{ list: ITodo[] }>(),
    'Update Todo Action': props<{ task: ITodo }>(),
    'Update Todo Success Action': props<{ task: ITodo }>(),
    'Delete Todo Action': props<{ task: ITodo }>(),
    'Delete Todo Success Action': props<{ task: ITodo }>(),
  },
});
