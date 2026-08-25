import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ITodo } from './app.interface';

@Injectable({ providedIn: 'root' })
export class TodosHttpService {
  private http: HttpClient = inject(HttpClient);

  private host: string = 'https://jsonplaceholder.typicode.com/todos';

  public getAll(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.host);
  }

  public update(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `${this.host}/${todo.id}`,
      JSON.stringify({
        ...todo,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.host}/${id}`);
  }
}
