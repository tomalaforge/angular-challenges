import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../service/todo.service';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
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
      exhaustMap((action: { todo: Todo }) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todo) => ({
            type: TodoActionName.updateTodoSuccess,
            todo: todo,
          })),
          catchError(() =>
            of({
              type: TodoActionName.todoErrorAlert,
              errorMsg: 'Error updating todo',
            }),
          ),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActionName.callDeleteTodo),
      exhaustMap((action: { id: number }) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => ({
            type: TodoActionName.deleteTodoSuccess,
            id: action.id,
          })),
          catchError(() =>
            of({
              type: TodoActionName.todoErrorAlert,
              errorMsg: 'Error deleting todo',
            }),
          ),
        ),
      ),
    ),
  );
}
