import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { finalize } from 'rxjs/operators';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private http = inject(HttpClient);
  private _todos = signal<Todo[]>([]);
  private _loading = signal(false);

  todos = computed(() => this._todos());
  loading = computed(() => this._loading());

  loadTodos() {
    this._loading.set(true);
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe((todos) => this._todos.set(todos));
  }

  updateTodo(todo: Todo) {
    this._loading.set(true);
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        },
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } },
      )
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe((todoUpdated) =>
        this._todos.update((todos) =>
          todos.map((t) => (t.id === todoUpdated.id ? todoUpdated : t)),
        ),
      );
  }

  deleteTodo(todo: Todo) {
    this._loading.set(true);
    return this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._todos.update((todos) => todos.filter((t) => t.id !== todo.id));
      });
  }
}
