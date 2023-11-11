import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoListSource = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todoListSource.asObservable();

  constructor(private http: HttpClient) {}

  public getTodos(): void {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todoListSource.next(todos);
      });
  }

  public update(todo: Todo): void {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
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
        }
      )
      .subscribe((todoUpdated: Todo) => {
        const currentTodos = this.todoListSource.value;
        this.todoListSource.next(
          currentTodos.map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo
          )
        );
      });
  }

  public delete(index: number): void {
    this.http
      .delete<void>(`https://jsonplaceholder.typicode.com/todos/${index}`)
      .subscribe((_) =>
        this.todoListSource.next(
          this.todoListSource.value.filter((todo) => todo.id !== index)
        )
      );
  }
}
