import { createFeature, createReducer, on } from '@ngrx/store';
import { todoActions } from './todo.actions';
import { baseTodoState } from './todo.state';

const todoFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    baseTodoState,
    on(todoActions.loadTodosSuccessAction, (state, action) => {
      return {
        ...state,
        list: [...action.list],
        errorMessage: '',
      };
    }),
    on(todoActions.updateTodoSuccessAction, (state, action) => {
      const update = state.list.map((value) => {
        return value.id === action.task.id ? action.task : value;
      });
      return {
        ...state,
        list: update,
        errorMessage: '',
      };
    }),
    on(todoActions.deleteTodoSuccessAction, (state, action) => {
      const del = state.list.filter((value) => value.id !== action.task.id);
      return {
        ...state,
        list: del,
        errorMessage: '',
      };
    }),
  ),
});

export const {
  name: todoFeatureKey,
  reducer: todoReducer,
  selectList,
} = todoFeature;
