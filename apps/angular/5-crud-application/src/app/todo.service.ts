import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { finalize, Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosSignal = signal<Todo[]>([]);
  loadingSignal = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getTodos(): void {
    this.loadingSignal.set(true);
    this.http
      .get<Todo[]>(this.apiUrl)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe((data) => this.todosSignal.set(data));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    this.loadingSignal.set(true);
    return this.http
      .put<Todo>(
        `${this.apiUrl}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe(finalize(() => this.loadingSignal.set(false)));
  }

  deleteTodo(id: number): Observable<void> {
    this.loadingSignal.set(true);
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.loadingSignal.set(false)));
  }
}
