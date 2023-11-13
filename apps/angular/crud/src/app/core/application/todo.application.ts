import { Todo } from '../entity/todo.interface';
import { TodoStore } from '../../infrastructure/+state/todo.store';
import { inject } from '@angular/core';

export class TodoApplication {
  private todoStore: TodoStore = inject(TodoStore);

  readonly todos$ = this.todoStore.todos$;

  // getAll() {
  //   return this.todoStore.loadTodos();
  // }

  update(todo: Todo) {
    this.todoStore.update(todo);
  }
}
