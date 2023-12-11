import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../service/todo.service';
import { map, exhaustMap, catchError, concatMap } from 'rxjs/operators';
import { EMPTY, concat, of } from 'rxjs';
import { TodoActionName } from '../actions/todo.actions';
import { Todo } from '../../model/todo.interface';

@Injectable()
export class TodoEffects {
  private actions$: Actions = inject(Actions);
  private todoService: TodoService = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActionName.callTodoList),
      exhaustMap(() =>
        this.todoService.callTodoList().pipe(
          map((todoList) => ({
            type: TodoActionName.loadTodoList,
            todoList: todoList,
          })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActionName.callUpdateTodo),
      concatMap((action: { todo: Todo }) =>
        concat(
          of({
            type: TodoActionName.todoStatus,
            id: action.todo.id,
            status: {
              loading: true,
            },
          }),
          this.todoService.updateTodo(action.todo).pipe(
            map((todo) => ({
              type: TodoActionName.updateTodoSuccess,
              todo: todo,
            })),
            catchError(() =>
              of({
                type: TodoActionName.todoStatus,
                id: action.todo.id,
                status: {
                  errorMsg: 'Error updating todo',
                },
              }),
            ),
          ),
          of({
            type: TodoActionName.todoStatus,
            id: action.todo.id,
            status: {
              loading: false,
            },
          }),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActionName.callDeleteTodo),
      concatMap((action: { id: number }) =>
        concat(
          of({
            type: TodoActionName.todoStatus,
            id: action.id,
            status: {
              loading: true,
            },
          }),
          this.todoService.deleteTodo(action.id).pipe(
            map(() => ({
              type: TodoActionName.deleteTodoSuccess,
              id: action.id,
            })),
            catchError(() =>
              of({
                type: TodoActionName.todoStatus,
                id: action.id,
                status: {
                  errorMsg: 'Error deleting todo',
                },
              }),
            ),
          ),
          of({
            type: TodoActionName.todoStatus,
            id: action.id,
            status: {
              loading: false,
            },
          }),
        ),
      ),
    ),
  );
}
