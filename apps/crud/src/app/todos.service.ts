import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }

  update(todo: Todo) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  delete(id: Todo['id']) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
