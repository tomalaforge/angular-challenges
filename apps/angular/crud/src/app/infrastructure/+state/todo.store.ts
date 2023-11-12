import { Todo } from '../../core/entity/todo.interface';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoService } from '../../core/port/todo.service';
import { map } from 'rxjs';

export interface TodoState {
  todos: Todo[];
}

const defaultState: TodoState = {
  todos: [],
};

@Injectable()
export class TodoStore extends ComponentStore<TodoState> {
  constructor(private todoService: TodoService) {
    super(defaultState);
  }

  readonly todos$ = this.select(({ todos }) => todos);

  readonly loadTodos = this.effect(() => {
    return this.todoService
      .getAll()
      .pipe(map((todos) => this.patchState({ todos })));
  });
}
