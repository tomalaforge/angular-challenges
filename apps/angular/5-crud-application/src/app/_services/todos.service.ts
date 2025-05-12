import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../_interfaces/todo.interface';
import { handleError } from '../_utils';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private readonly http = inject(HttpClient);
  private readonly url = environment.config.API_URL;
  private readonly headers = environment.config.API_HEADERS;

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.url, { headers: this.headers })
      .pipe(catchError(handleError));
  }

  updateTodo(id: number, changes: Partial<Todo>): Observable<Todo> {
    return this.http
      .put<Todo>(`${this.url}/${id}`, JSON.stringify(changes), {
        headers: this.headers,
      })
      .pipe(catchError(handleError));
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http
      .delete<Todo>(`${this.url}/${id}`)
      .pipe(catchError(handleError));
  }
}
