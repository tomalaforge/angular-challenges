import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo, UpdatedTodo } from './app.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(id: number) {
    return this.http.put<UpdatedTodo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        todo: id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
