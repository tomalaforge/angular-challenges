import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private todosList = new BehaviorSubject<Todo[]>([]);
  public todoList$: Observable<Todo[]> = this.todosList.asObservable();

  public initTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((response: Todo[]) => this.todosList.next(response)));
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    todo.title = randText();
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        todo,
        { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
      )
      .pipe(
        tap((response: Todo) =>
          this.todosList.next(
            this.todosList.value.map((t) =>
              t.id === response.id ? response : t
            )
          )
        )
      );
  }

  public deleteTodo(todo: Todo): Observable<Todo> {
    return this.http
      .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .pipe(
        tap(() =>
          this.todosList.next(
            this.todosList.value.filter((t) => t.id !== todo.id)
          )
        )
      );
  }
}
