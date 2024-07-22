import { Injectable } from '@angular/core';
import {
  CreateQueryResult,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { Todo } from '../todo';
import { TodosService } from '../todos.service';

export interface TodoQueryService extends CreateQueryResult<Todo[], Error> {}

@Injectable({ providedIn: 'root' })
export class TodoQueryService {
  constructor(private service: TodosService) {
    return Object.assign(
      this,
      injectQuery(() => ({
        queryKey: ['todos'],
        queryFn: () => this.service.getTodos(),
      })),
    );
  }
}
