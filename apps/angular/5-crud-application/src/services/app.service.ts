import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';

const baseUri = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  todos: Todo[] = [];
  todosBehavior = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Todo[]>(`${baseUri}`).subscribe((todos) => {
      this.todos = todos;
      this.todosBehavior.next(todos);
    });
  }

  updateTodo(todoId: string, updatedTodo: Todo) {
    this.http
      .put<Todo>(`${baseUri}/${todoId}`, JSON.stringify(updatedTodo), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .subscribe((todoUpdated) => {
        this.todos = [
          ...this.todos.filter((t) => t.id !== todoId),
          todoUpdated,
        ];
      });
    this.todosBehavior.next(this.todos);
  }

  deleteTodo(deletedTodoId: string) {
    this.http.delete(`${baseUri}/${deletedTodoId}`).subscribe((val) => {
      this.todos = [...this.todos.filter((t) => t.id !== deletedTodoId)];
    });
    this.todosBehavior.next(this.todos);
  }
}
