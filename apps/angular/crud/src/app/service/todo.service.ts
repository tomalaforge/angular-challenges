import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly baseUrl: string = 'https://jsonplaceholder.typicode.com/todos/';

  private http: HttpClient = inject(HttpClient);

  callTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const requestBody = JSON.stringify({
      id: todo.id,
      title: randText(),
      userId: todo.userId,
      completed: todo.completed,
    });

    const httpOptions = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    return this.http.put<Todo>(
      this.baseUrl.concat(todo.id.toString()),
      requestBody,
      httpOptions,
    );
  }

  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl.concat(todoId.toString()));
  }
}
