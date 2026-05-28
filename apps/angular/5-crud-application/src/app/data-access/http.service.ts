import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class HttpTodoService {
  private http = inject(HttpClient);

  getTodos = () =>
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  update = (id: number) =>
    this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        id: id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

  delete = (id: number) =>
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
