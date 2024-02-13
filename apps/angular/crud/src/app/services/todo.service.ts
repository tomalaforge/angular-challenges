import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { ITodo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: WritableSignal<ITodo[]> = signal([]);

  constructor(private readonly http: HttpClient) {}

  getAll(): void {
    this.http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => this.todos.set(todos));
  }

  update(todo: ITodo): Observable<ITodo> {
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: 'todo.body', // TODO: replace placeholder with content
      userId: todo.userId,
    });
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    return this.http.put<ITodo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      body,
      { headers },
    );
  }
}
