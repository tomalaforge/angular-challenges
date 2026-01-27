import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { todo } from './todo.model';

@Injectable({
  providedIn: 'root', // Makes the service a singleton available throughout the app
})
export class ServiceApp {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: todo) {
    return this.http.put<todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
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
    );
  }

  deleteTodo(todo: todo) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}
