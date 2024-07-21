import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../types';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly _http = inject(HttpClient);
  private readonly _url = 'https://jsonplaceholder.typicode.com/todos';

  getTodoList(): Observable<Todo[]> {
    return this._http.get<Todo[]>(this._url);
  }

  updateTodo(id: number): Observable<Todo> {
    return this._http.put<Todo>(
      `${this._url}/${id}`,
      JSON.stringify({
        id,
        userId: 1,
        title: randText(),
      } as Todo),
      { headers: { 'Content-type': 'application/json;charset=UTF-8' } },
    );
  }

  deleteTodo(id: number) {
    return this._http.delete(`${this._url}/${id}`);
  }
}
