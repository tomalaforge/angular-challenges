import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(id: number) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  deleteTodo(id: number) {
    return this.http.delete<object>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
