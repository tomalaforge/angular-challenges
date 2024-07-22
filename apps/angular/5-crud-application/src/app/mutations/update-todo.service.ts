import { inject, Injectable } from '@angular/core';
import {
  CreateMutationResult,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

export interface UpdateTodoService
  extends CreateMutationResult<Todo, Error, Todo> {}

@Injectable({ providedIn: 'root' })
export class UpdateTodoService {
  private service = inject(TodosService);
  constructor() {
    return Object.assign(
      this,
      injectMutation<Todo, Error, Todo>((client) => ({
        mutationFn: (todo: Todo) => this.service.updateTodo(todo),
        onSuccess(data) {
          client.setQueryData<Todo[]>(['todos'], (prev) =>
            prev?.map((t) => (t.id === data.id ? data : t)),
          );
        },
      })),
    );
  }
}
