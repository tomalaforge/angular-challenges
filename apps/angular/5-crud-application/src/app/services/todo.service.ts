import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  isLoading = signal<boolean>(false);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  updateTodo(id: string, todo: Todo) {
    const todoUpdated = JSON.stringify({
      todo: todo.id,
      title: randText(),
      userId: todo.userId,
    });

    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todoUpdated, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
