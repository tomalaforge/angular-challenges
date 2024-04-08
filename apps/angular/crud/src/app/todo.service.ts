import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { randText } from '@ngneat/falso';
import { Subject, exhaustMap, map, tap } from 'rxjs';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private update = new Subject<{ todo: Todo; index: number }>();
  private delete = new Subject<{ todo: Todo }>();

  todos = signal<Todo[]>([]);

  constructor() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((todos) => this.todos.set(todos)))
      .pipe(takeUntilDestroyed())
      .subscribe();

    this.update
      .asObservable()
      .pipe(
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
        tap(({ todo: newTodo, index }) =>
          this.todos.update((todos) => {
            // todos.with(index, newTodo) new syntax not working here :(
            return todos
              .slice(0, index)
              .concat(newTodo, todos.slice(index + 1));
          }),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    this.delete
      .asObservable()
      .pipe(
        exhaustMap(({ todo }) =>
          this.http
            .delete<Todo>(
              `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
            )
            .pipe(map(() => ({ id: todo.id }))),
        ),
        tap(({ id: deletedTodoId }) =>
          this.todos.update((todos) =>
            todos.filter((t) => t.id !== deletedTodoId),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();

    effect(() => {
      //   console.log(this.todos());
    });
  }

  updateTodo(todo: Todo, index: number) {
    return this.update.next({ todo, index });
  }

  deleteTodo(todo: Todo) {
    return this.delete.next({ todo });
  }
}
