import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TODO } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class FakeHttpService {
  private http = inject(HttpClient);
  todoSignal = signal<TODO[]>([]);

  getAllTodos() {
    this.http
      .get<TODO[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todosResponse: TODO[]) => {
          this.todoSignal.set(todosResponse);
        },
        error: (err) => {
          console.error('Failed to load todos:', err);
        },
      });
  }

  updateTodo(todo: TODO) {
    this.http
      .put<TODO>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          ...todo,
          title: randText(),
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe({
        next: (updated) => {
          this.todoSignal.update((todos) =>
            todos.map((t) => (t.id === updated.id ? updated : t)),
          );
        },
        error: (err) => {
          console.error('Failed to load todos:', err);
        },
      });
  }
  deleteTodo(todo: TODO) {
    this.http
      .delete<TODO>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe(() =>
        this.todoSignal.update((todos) =>
          todos.filter((t) => t.id !== todo.id),
        ),
      );
  }
}
