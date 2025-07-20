import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { map, Observable } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';
import { Todo } from './todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService extends Todo {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getAll(): Observable<ITodo[]> {
    return this.http
      .get<ITodo[]>(this.baseUrl)
      .pipe(
        map((todos: ITodo[]) =>
          todos.map((todo: ITodo) => ({ ...todo, isLoading: false })),
        ),
      );
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify({
        title: randText(),
        completed: false,
        userId: todo.userId,
        id: todo.id,
        isLoading: false,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }

  deleteTodo(id: number): Observable<object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
