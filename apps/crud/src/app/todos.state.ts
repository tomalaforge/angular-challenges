import { inject, Injectable } from '@angular/core';
import { remove, update } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { exhaustMap, map } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todos: Todo[];
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
        exhaustMap((id) => this.todoService.updateTodo(id))
      ),
      ({ todos }, todo) => update(todos, todo, 'id')
    );
    this.connect(
      'todos',
      this.actions.delete$.pipe(
        exhaustMap((id) => this.todoService.deleteTodo(id).pipe(map(() => id)))
      ),
      ({ todos }, id) => remove(todos, [{ id }], 'id')
    );
  }

  update(id: number) {
    this.actions.update(id);
  }

  delete(id: number) {
    this.actions.delete(id);
  }
}
