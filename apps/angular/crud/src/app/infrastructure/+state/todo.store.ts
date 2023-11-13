import { Todo } from '../../core/entity/todo.interface';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoService } from '../../core/port/todo.service';
import { concatMap, map, Observable, tap } from 'rxjs';

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

  readonly load = this.effect(() => {
    return this.todoService
      .getAll()
      .pipe(map((todos) => this.patchState({ todos })));
  });

  readonly update = this.effect((todo$: Observable<Todo>) => {
    return todo$.pipe(
      concatMap((todo: Todo) =>
        this.todoService.update(todo).pipe(tap((todo) => this.setTodo(todo)))
      )
    );
  });

  private setTodo(todo: Todo) {
    this.updater((state, todo: Todo) => {
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
      };
    });
  }
}
