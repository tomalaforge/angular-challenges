import { inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoService } from './todo.service';

export const todoKeys = {
  all: ['todos'] as const,
};

export const injectAllTodos = () => {
  const todoService = inject(TodoService);
  return injectQuery(() => ({
    queryKey: todoKeys.all,
    queryFn: async () => lastValueFrom(todoService.getAllTodo()),
  }));
};

export const injectTodoUpdate = () => {
  const todoService = inject(TodoService);
  return injectMutation((client) => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.update(todoId)),
    onSuccess: () => client.invalidateQueries({ queryKey: todoKeys.all }),
  }));
};

export const injectTodoDelete = () => {
  const todoService = inject(TodoService);
  return injectMutation((client) => ({
    mutationFn: (todoId: number) => lastValueFrom(todoService.delete(todoId)),
    onSuccess: () => client.invalidateQueries({ queryKey: todoKeys.all }),
  }));
};
