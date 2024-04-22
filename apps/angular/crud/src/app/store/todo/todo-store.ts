import { Injectable, inject } from '@angular/core';

import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Todo } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service';
import { TodoDeleteArgs, TodoUpdateArgs } from './todo-args';
@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly QUERY_KEY = 'TODOS_STORE';
  private queryClient = injectQueryClient();
  private todoService = inject(TodoService);

  public query = injectQuery(() => ({
    queryKey: [this.QUERY_KEY],
    queryFn: () => lastValueFrom(this.todoService.get()),
  }));

  todos = injectMutation(() => ({
    mutationFn: async () => {
      return await lastValueFrom(this.todoService.get());
    },
    onSuccess: (data) => {
      return this.queryClient.setQueryData([this.QUERY_KEY], data);
    },
    onError: (error) => {
      console.error(error);
    },
  }));

  update = injectMutation(() => ({
    mutationFn: async (args: TodoUpdateArgs) => {
      return await lastValueFrom(this.todoService.update(args.payload));
    },
    onSuccess: (_, variable) => {
      return this.queryClient.setQueryData(
        [this.QUERY_KEY],
        this.updateTodo(this.currentTodos, variable.payload),
      );
    },
    onError: (error) => {
      console.error(error);
    },
  }));

  delete = injectMutation(() => ({
    mutationFn: async (args: TodoDeleteArgs) => {
      return await lastValueFrom(this.todoService.delete(args.payload));
    },
    onSuccess: (_, variable) => {
      return this.queryClient.setQueryData(
        [this.QUERY_KEY],
        this.deleteTodo(this.currentTodos, variable.payload),
      );
    },
    onError: (error) => {
      console.error(error);
    },
  }));

  private get currentTodos() {
    return this.queryClient.getQueryData<Todo[]>([this.QUERY_KEY]) ?? [];
  }

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
