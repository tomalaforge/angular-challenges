import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TodoDetails } from './../model/user';

@Injectable({
  providedIn: 'root',
})
export class CrudSpecialService {
  constructor(private http: HttpClient) {}

  getAll$ = this.http
    .get<TodoDetails[]>('https://jsonplaceholder.typicode.com/todos')
    .pipe(
      retry(3),
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      }),
    );

  public allTodos = toSignal(this.getAll$, {
    initialValue: [] as TodoDetails[],
  });
  public updateTodo(todo: TodoDetails): Observable<TodoDetails> {
    return this.http.put<TodoDetails>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: todo.title,
        body: todo,
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    ); //.pipe(retry(3), delay(100), catchError((error)=>{ console.error(error); return throwError(()=>error);}));
  }

  public deleteTodo(todo: TodoDetails): Observable<any> {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
    //.pipe(retry(3), catchError((error)=>{ console.error(error); return throwError(()=>error);}));
  }
}
