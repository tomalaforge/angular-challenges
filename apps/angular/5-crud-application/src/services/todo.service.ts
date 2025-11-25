import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private api = 'https://jsonplaceholder.typicode.com/todos';
  todoList = signal<Todo[]>([]);

  private http = inject(HttpClient);

  loadTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api).pipe(
      tap((list) => this.todoList.set(list.slice(0, 10))), // пример — первые 10
    );
  }

  update(todo: Todo) {
    return this.http.put<Todo>(`${this.api}/${todo.id}`, todo).pipe(
      tap((updated) => {
        // immutably replace, keeping order
        const newList = this.todoList().map((t) =>
          t.id === updated.id ? updated : t,
        );
        this.todoList.set(newList);
      }),
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap(() => {
        this.todoList.set(this.todoList().filter((t) => t.id !== id));
      }),
    );
  }
}
