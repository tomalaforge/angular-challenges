import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../service/todo.service';
import {
  map,
  exhaustMap,
  catchError,
  concatMap,
  mergeMap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { TodoActions } from '../actions/todo.actions';
import { Todo } from '../../model/todo.interface';

@Injectable()
export class TodoEffects {
  private actions$: Actions = inject(Actions);
  private todoService: TodoService = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.callTodoList),
      exhaustMap(() =>
        this.todoService.callTodoList().pipe(
          map((todoList) => TodoActions.loadTodoList({ todoList: todoList })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.callUpdateTodo),
      concatMap((action: { todo: Todo }) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todo) => TodoActions.updateTodoSuccess({ todo: todo })),
          catchError(() =>
            of(
              TodoActions.todoError({
                id: action.todo.id,
                errorMsg: 'Error updating todo',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.callDeleteTodo),
      mergeMap((action: { id: number }) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError(() =>
            of(
              TodoActions.todoError({
                id: action.id,
                errorMsg: 'Error deleting todo',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
