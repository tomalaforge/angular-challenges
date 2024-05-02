import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './types';

const url = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  readonly todos = this.http.get<Todo[]>(url);

  update(todo: Todo) {
    return this.http.put<Todo>(`${url}/${todo.id}`, {
      ...todo,
      title: randText(),
    });
  }

  delete(todo: Todo) {
    return this.http.delete<Todo>(`${url}/${todo.id}`);
  }
}
