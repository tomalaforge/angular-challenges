import { Update } from '@ngrx/entity';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Todo } from '../../_interfaces/todo.interface';

export const loadTodosActions = createActionGroup({
  source: 'Todos/Load',
  events: {
    Load: emptyProps(),
    Success: props<{ todos: Todo[] }>(),
    Failure: props<{ error: string }>(),
  },
});

export const updateTodoActions = createActionGroup({
  source: 'Todos/Update',
  events: {
    Update: props<{ update: Update<Todo> }>(),
    Success: props<{ update: Update<Todo> }>(),
    Failure: props<{ error: string }>(),
  },
});

export const deleteTodoActions = createActionGroup({
  source: 'Todos/Delete',
  events: {
    Delete: props<{ todo: Todo }>(),
    Success: props<{ todo: Todo }>(),
    Failure: props<{ error: string }>(),
  },
});
