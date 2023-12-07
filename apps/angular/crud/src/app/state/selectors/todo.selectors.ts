import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../todo.state';

export const selectTodo = createFeatureSelector<TodoState>('todo');

export const selectTodoList = createSelector(
  selectTodo,
  (state: TodoState) => state.todoList,
);
