import { Injectable, inject } from '@angular/core';

import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { OperationType } from '../enums/actions.enum';
import { TodoStateArgs } from './todo-args';
@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly QUERY_KEY = 'TODOS_STORE';
  private queryClient = injectQueryClient();
  private todoService = inject(TodoService);

  public query = injectQuery(() => ({
    queryKey: [this.QUERY_KEY],
    queryFn: () => this.todoService.get().toPromise(),
  }));

  mutation = injectMutation(() => ({
    mutationFn: async (args: TodoStateArgs) => {
      switch (args.type) {
        case OperationType.UPDATE: {
          return await this.todoService.update(args.payload).toPromise();
        }
        case OperationType.DELETE: {
          return await this.todoService.delete(args.payload).toPromise();
        }
        case OperationType.GET: {
          return await this.todoService.get().toPromise();
        }
      }
    },
    onSuccess: (data, variables) => {
      const currentTodos =
        this.queryClient.getQueryData<Todo[]>([this.QUERY_KEY]) ?? [];
      switch (variables.type) {
        case OperationType.DELETE: {
          return this.queryClient.setQueryData(
            [this.QUERY_KEY],
            this.deleteTodo(currentTodos, variables.payload),
          );
        }
        case OperationType.UPDATE: {
          return this.queryClient.setQueryData(
            [this.QUERY_KEY],
            this.updateTodo(currentTodos, variables.payload),
          );
        }
        case OperationType.GET: {
          return this.queryClient.setQueryData([this.QUERY_KEY], data);
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
  }));

  private deleteTodo(todos: Todo[], id: number) {
    return todos.filter((todo) => todo.id !== id);
  }

  private updateTodo(todos: Todo[], updatedTodo: Todo) {
    return todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo = updatedTodo;
      }
      return todo;
    });
  }
}
