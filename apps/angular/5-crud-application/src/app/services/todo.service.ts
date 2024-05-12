import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  updateTodo(id: string, todo: string) {
    return this.http.put<Todo>(`${this.baseUrl}/${id}`, todo, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
