import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly todoUrl = environment.baseUrl + '/todos';
  getTodos() {
    return this.http.get<Todo[]>(this.todoUrl);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.todoUrl, todo);
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${this.todoUrl}/${todo.id}`, todo);
  }

  getTodo(id: number) {
    return this.http.get<Todo>(`${this.todoUrl}/${id}`);
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`${this.todoUrl}/${id}`);
  }
}
