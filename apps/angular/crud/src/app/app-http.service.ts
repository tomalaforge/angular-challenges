import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ToDo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  constructor(private http: HttpClient) {}

  public getTodos$(): Observable<Array<ToDo>> {
    return this.http.get<Array<ToDo>>(
      'https://jsonplaceholder.typicode.com/todos',
    );
  }

  public updateTodo$(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
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

  public deleteTodo$(id: number): Observable<ToDo> {
    return this.http.delete<ToDo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
  }
}
