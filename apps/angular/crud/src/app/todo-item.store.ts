import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoService } from './todo.service';
import { TodoStore } from './todo-store';

interface TodoState {
  todo?: Todo;
  loading?: boolean;
  error?: string;
  status?: string;
}

const initialTodoState: TodoState = {
  loading: false,
  status: '',
  error: '',
};

@Injectable({
  providedIn: 'root',
})
export class TodoItemStore extends ComponentStore<TodoState> {
  constructor() {
    super(initialTodoState);
  }

  todo$ = this.select((s) => s.todo);
  loading$ = this.select((s) => s.loading);
  status$ = this.select((s) => s.status);
  error$ = this.select((s) => s.error);

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      loading: this.loading$,
      status: this.status$,
      error: this.error$,
    },
    { debounce: true }
  );

  private todoService = inject(TodoService);
  private todoStore = inject(TodoStore);

  updateTodo = this.effect<Todo>(
    pipe(
      tap(() => this.setState({ loading: true, status: 'updating...' })),
      switchMap((todo) =>
        this.todoService.updateTodos(todo).pipe(
          tapResponse(
            (todos) => {
              this.todoStore.updateTodos(todos);
              this.setState({ loading: false });
            },
            (error: HttpErrorResponse) => {
              this.setState({ loading: false, error: error.message });
            }
          )
        )
      )
    )
  );

  deleteTodo = this.effect<number>(
    pipe(
      tap(() => this.setState({ loading: true, status: 'deleting...' })),

      switchMap((todo) =>
        this.todoService.deleteTodos(todo).pipe(
          tapResponse(
            () => {
              this.todoStore.deleteTodos(todo),
                this.setState({ loading: false });
            },
            (error: HttpErrorResponse) => {
              this.setState({ loading: false, error: error.message });
            }
          )
        )
      )
    )
  );
}
