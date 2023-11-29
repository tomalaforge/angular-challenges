import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Todo } from '../model/todo.interface';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly baseUrl: string = 'https://jsonplaceholder.typicode.com/todos/';

  public todoList = signal<Todo[]>([]);
  private http: HttpClient = inject(HttpClient);

  callTodoList(): void {
    this.http.get<Todo[]>(this.baseUrl).subscribe({
      next: (todoList) => {
        this.todoList.set(todoList);
      },
    });
  }

  updateTodo(todo: Todo): void {
    const requestBody = JSON.stringify({
      id: todo.id,
      title: randText(),
      userId: todo.userId,
      completed: todo.completed,
    });

    const httpOptions = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    this.http
      .put<Todo>(
        this.baseUrl.concat(todo.id.toString()),
        requestBody,
        httpOptions,
      )
      .subscribe({
        next: (todo) => {
          this.todoList.update((todoList) => {
            return [...todoList.filter((t) => t.id !== todo.id), todo].sort(
              (t1, t2) => t1.id - t2.id,
            );
          });
        },
      });
  }

  deleteTodo(todoId: number): void {
    this.http.delete(this.baseUrl.concat(todoId.toString())).subscribe({
      next: () => {
        this.todoList.update((todoList) => {
          return todoList.filter((t) => t.id !== todoId);
        });
      },
    });
  }
}