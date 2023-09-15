import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo.model';
import { randText } from '@ngneat/falso';

export const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  constructor(private http: HttpClient) {}

  update(todo: TodoItem) {
    return this.http.put<TodoItem>(
      `${TODOS_URL}/${todo.id}`,
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
      }
    );
  }

  deleteTodo(todoId: number) {
    return this.http.delete(`${TODOS_URL}/${todoId}`);
  }

  getTodos() {
    return this.http.get<TodoItem[]>(TODOS_URL);
  }
}
