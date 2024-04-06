import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: Todo) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        //todo: todo.id,
        title: randText(),
        body: todo.body,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  delete(todo: Todo) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}
