import { inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { HttpTodoService } from './http.service';
import { Todo } from '../model/todo.model';

export const todoKeys = {
  all: ['todos'] as const,
};

export const injectTodos = () => {
  const todoService = inject(HttpTodoService);
  return injectQuery(() => ({
    queryKey: todoKeys.all,
    queryFn: async () => lastValueFrom(todoService.getTodos()),
  }));
};

export const injectTodoUpdate = () => {
  const todoService = inject(HttpTodoService);
  const client = inject(QueryClient);
  return injectMutation(() => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.update(todoId)),
    onSuccess: (updatedTodo, todoId) => {
      client.setQueryData<Todo[]>(todoKeys.all, (todos) =>
        todos?.map((todo) =>
          todo.id === todoId ? { ...todo, ...updatedTodo } : todo,
        ),
      );
    },
  }));
};

export const injectTodoDelete = () => {
  const todoService = inject(HttpTodoService);
  const client = inject(QueryClient);
  return injectMutation(() => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.delete(todoId)),
    onSuccess: (_, todoId) => {
      client.setQueryData<Todo[]>(todoKeys.all, (todos) =>
        todos?.filter((todo) => todo.id !== todoId),
      );
    },
  }));
};
