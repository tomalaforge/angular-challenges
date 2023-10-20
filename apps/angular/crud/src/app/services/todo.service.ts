import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable()
export class TodoService {
  public todos = new BehaviorSubject<Todo[]>([]);
  public error!: Error;
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public getTodos(): void {
    this.isLoading.next(true);
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        catchError((error: Error) => {
          this.error = error;
          return throwError(error);
        })
      )
      .subscribe((todos: Todo[]) => {
        this.todos.next(todos);
        this.isLoading.next(false);
      });
  }

  public updateTodoById(id: number, updatedTodo: Todo): void {
    this.isLoading.next(true);

    this.http
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo)
      .pipe(
        catchError((error: Error) => {
          this.error = error;
          return throwError(error);
        })
      )
      .subscribe(() => {
        const currentTodos = this.todos.value;
        const updatedTodos = currentTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...updatedTodo };
          }
          return todo;
        });
        this.todos.next(updatedTodos);
        this.isLoading.next(false);
      });
  }

  public deleteTodoById(id: number): void {
    this.isLoading.next(true);

    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        catchError((error: Error) => {
          this.error = error;
          return throwError(error);
        })
      )
      .subscribe(() => {
        const currentTodos = this.todos.value;
        const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
        this.todos.next(updatedTodos);
        this.isLoading.next(false);
      });
  }
}
