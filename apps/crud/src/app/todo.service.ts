import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, Observable, catchError, pipe } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private todoSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    []
  );
  public todo$: Observable<Todo[]> = this.todoSubject.asObservable();

  getAllTodo() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (value: Todo[]) => {
          return this.todoSubject.next(value);
        },
        error: (error: unknown) => {
          console.error('Error fetching data:', error);
        },
      });
  }

  update(todo: Todo) {
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          id: todo.id,
          title: randText(),
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      .subscribe((todoUpdated: Todo) => {
        let currentTodos = this.todoSubject.value;
        const updatedTodos = currentTodos.map((t) =>
          t.id === todoUpdated.id ? { ...t, ...todoUpdated } : t
        );
        this.todoSubject.next(updatedTodos);
      });
  }

  delete(todo: Todo) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/posts/${todo.id}/45`)
      .subscribe({
        next: () => {
          const currentTodos = this.todoSubject.value;
          const updatedTodos = currentTodos.filter((t) => t.id !== todo.id);
          this.todoSubject.next(updatedTodos);
        },
      });
  }
}
