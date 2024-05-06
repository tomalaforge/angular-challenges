import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { delay } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  readonly todos = signal<Todo[]>([]);
  readonly loadingApp = signal(true);
  readonly savingTodos = signal<number[]>([]);

  addAll(todos: Todo[]) {
    this.todos.set(todos);
  }

  loadAll() {
    this.http
      .get<Todo[]>(this.apiUrl)
      .pipe(delay(1000))
      .subscribe({
        next: (todos) => {
          this.todos.set(todos);
          this.loadingApp.set(false);
        },
        error: () => {
          this.loadingApp.set(false);
        },
      });
  }

  update(id: number) {
    this.setSavingTodo(id, true);
    this.http
      .patch<Todo>(
        `${this.apiUrl}/${id}`,
        JSON.stringify({
          title: randText(),
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe({
        next: (todoUpdated: Todo) => {
          this.todos.update((todos) => [
            ...todos.map((t) =>
              t.id === id ? { ...t, title: todoUpdated.title } : t,
            ),
          ]);
          this.setSavingTodo(id, false);
        },
        error: () => {
          this.setSavingTodo(id, false);
        },
      });
  }

  delete(id: number) {
    this.setSavingTodo(id, true);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.todos.update((todos) => [...todos.filter((t) => t.id !== id)]);
        this.setSavingTodo(id, false);
      },
      error: () => {
        this.setSavingTodo(id, false);
      },
    });
  }

  private setSavingTodo(id: number, status: boolean) {
    this.savingTodos.update((ids) => {
      if (status) {
        return ids.indexOf(id) === -1 ? [...ids, id] : [...ids];
      } else {
        return ids.indexOf(id) === -1
          ? [...ids]
          : [...ids.filter((i) => i !== id)];
      }
    });
  }
}
