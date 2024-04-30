import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from './app.component';

@Injectable({ providedIn: 'root' })
export class TodosService {
  http = inject(HttpClient);
  todos = signal([] as Todo[]);
  private url = 'https://jsonplaceholder.typicode.com/todos';

  getTodos() {
    this.http.get<Todo[]>(this.url).subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  updateTodo(todo: Todo) {
    this.http
      .put<Todo>(
        `${this.url}/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: Todo) => {
        this.todos.update((todos) =>
          todos.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        );
      });
  }

  deleteTodo(deletedTodo: Todo) {
    this.http.delete<void>(`${this.url}/${deletedTodo.id}`).subscribe(() => {
      this.todos.update((todos) =>
        todos.filter((todo) => todo.id !== deletedTodo.id),
      );
    });
  }
}
