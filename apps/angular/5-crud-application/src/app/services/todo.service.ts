import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { randText } from '@ngneat/falso';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  // Fetch all todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  // Update a todo
  updateTodo(todo: Todo): Observable<Todo> {
    const updatedTodo = {
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    };

    return this.http.put<Todo>(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify(updatedTodo),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }
}
