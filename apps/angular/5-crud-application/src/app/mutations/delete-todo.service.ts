import { inject, Injectable } from '@angular/core';
import {
  CreateMutationResult,
  injectMutation,
} from '@tanstack/angular-query-experimental';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

export interface DeleteTodoService
  extends CreateMutationResult<void, Error, number> {}

@Injectable({ providedIn: 'root' })
export class DeleteTodoService {
  private service = inject(TodosService);
  constructor() {
    return Object.assign(
      this,
      injectMutation<void, Error, number>((client) => ({
        mutationFn: (todoId) => this.service.deleteTodo(todoId),
        onSuccess(_, todoId) {
          client.setQueryData<Todo[]>(['todos'], (prev) =>
            prev?.filter((t) => t.id !== todoId),
          );
        },
      })),
    );
  }
}
