import { randomErrorHttp } from '@angular-challenges/shared/utils';
import { inject, Injectable } from '@angular/core';
import { remove, update } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Todo, WithError } from './todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todos: WithError<Todo>[];
}

interface TodosActions {
  update: number;
  delete: number;
}

@Injectable()
export class TodosStateService extends RxState<TodosState> {
  private readonly todoService = inject(TodoService);
  private readonly actions =
    inject<RxActionFactory<TodosActions>>(RxActionFactory).create();

  readonly vm$ = this.select();

  constructor() {
    super();
    this.connect('todos', this.todoService.getTodos());
    this.connect(
      'todos',
      this.actions.update$.pipe(
        exhaustMap((id) =>
          randomErrorHttp({
            httpRequest: () => this.todoService.updateTodo(id),
          }).pipe(
            map((t) => ({ ...t, error: undefined })),
            catchError((error) => of({ id, error }))
          )
        )
      ),
      ({ todos }, todo) => update(todos, todo, 'id')
    );
    this.connect(
      'todos',
      this.actions.delete$.pipe(
        exhaustMap((id) =>
          randomErrorHttp({
            httpRequest: () => this.todoService.deleteTodo(id),
          }).pipe(
            map(() => ({ id, error: undefined })),
            catchError((error) => of({ id, error }))
          )
        )
      ),
      ({ todos }, todo) =>
        todo.error
          ? update(todos, todo, 'id')
          : remove(todos, [{ id: todo.id }], 'id')
    );
  }

  update(id: number) {
    this.actions.update(id);
  }

  delete(id: number) {
    this.actions.delete(id);
  }
}
