import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../interfaces/ITodo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    const headers = new HttpHeaders().set(
      'Content-type',
      'application/json; charset=UTF-8',
    );
    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo,
      { headers },
    );
  }

  deleteTodo(todo: ITodo): Observable<ITodo> {
    return this.http.delete<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo,
    );
  }
}
