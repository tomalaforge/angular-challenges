import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToDoItem } from '../store/model/to-do.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  fetch() {
    return this.http.get<ToDoItem[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }

  update(todo: ToDoItem) {
    return this.http.put<ToDoItem>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify(todo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  delete(id: number) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }
}
