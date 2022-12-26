import { inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Todo } from './todo.model';
import { TodosStateService } from './todos.state';

interface TodoItemState {
  todo: Todo;
  loading: boolean;
}

@Injectable()
export class TodoItemStateService extends RxState<TodoItemState> {
  private todosService = inject(TodosStateService);

  vm$ = this.select();

  update(id: number) {
    this.set({ loading: true });
    this.todosService.update(id);
  }

  delete(id: number) {
    this.set({ loading: true });
    this.todosService.delete(id);
  }
}
