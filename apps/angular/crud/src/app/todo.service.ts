import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { randText } from '@ngneat/falso';
import { Subject, exhaustMap, map, merge, tap } from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos = signal<Todo[]>([]);

  private http = inject(HttpClient);
  private update = new Subject<{ todo: Todo; index: number }>();
  private delete = new Subject<{ todo: Todo }>();

  private load$ = this.http
    .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    .pipe(tap((todos) => this.todos.set(todos)));

  private delete$ = this.delete.asObservable().pipe(
    exhaustMap(({ todo }) =>
      this.http
        .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
        .pipe(map(() => todo.id)),
    ),
    tap((deletedTodoId) =>
      this.todos.update((todos) => todos.filter((t) => t.id !== deletedTodoId)),
    ),
  );

  private update$ = this.update.asObservable().pipe(
    exhaustMap(({ todo, index }) => {
      return this.http
        .put<Todo>(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          JSON.stringify({
            todo: todo.id,
            title: randText(),
            body: todo.title,
            userId: todo.userId,
          }),
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        )
        .pipe(map((todo) => ({ todo, index })));
    }),
    map(({ todo, index }) => {
      // todos.with(index, todo) new syntax not working here :(
      this.todos.update((todos) =>
        todos.slice(0, index).concat(todo, todos.slice(index + 1)),
      );

      return todo.id;
    }),
  );

  constructor() {
    merge(this.load$, this.update$, this.delete$)
      .pipe(takeUntilDestroyed())
      .subscribe();
  }

  updateTodo(todo: Todo, index: number) {
    return this.update.next({ todo, index });
  }

  deleteTodo(todo: Todo) {
    return this.delete.next({ todo });
  }
}
