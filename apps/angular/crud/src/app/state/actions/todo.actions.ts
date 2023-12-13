import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../model/todo.interface';

export const TodoActions = createActionGroup({
  source: 'Todo',
  events: {
    CallTodoList: emptyProps(),
    LoadTodoList: props<{ todoList: Todo[] }>(),
    CallUpdateTodo: props<{ todo: Todo }>(),
    CallDeleteTodo: props<{ id: number }>(),
    UpdateTodoSuccess: props<{ todo: Todo }>(),
    DeleteTodoSuccess: props<{ id: number }>(),
    TodoError: props<{ id: number; errorMsg: string }>(),
  },
});
