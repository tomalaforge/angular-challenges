import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { TODO } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos(): Observable<TODO[]> {
    return this.http.get<TODO[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: TODO): Observable<TODO> {
    return this.http.put<TODO>(
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
      },
    );
  }

  deleteTodo(todoId: number): Observable<TODO[]> {
    return this.http.delete<TODO[]>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );
  }
}
