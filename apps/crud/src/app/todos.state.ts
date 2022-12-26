import { inject, Injectable } from '@angular/core';
import { update } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todos: Todo[];
}

@Injectable()
export class TodosStateService extends RxState<TodosState> {
  private todoService = inject(TodoService);

  vm$ = this.select();

  update(id: number) {
    this.connect('todos', this.todoService.updateTodo(id), ({ todos }, todo) =>
      update(todos, todo, 'id')
    );
  }

  delete(id: number) {
    this.connect('todos', this.todoService.deleteTodo(id), ({ todos }) =>
      todos.filter((t) => t.id !== id)
    );
  }

  init() {
    this.connect('todos', this.todoService.getTodos());
  }
}
