import { HttpClient } from '@angular/common/http';
import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { randText } from '@ngneat/falso';
import { ITodo } from './ITodo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  #todo = signal<ITodo[]>([]);
  todos = computed(this.#todo);
  destroyRef = inject(DestroyRef);

  private _http = inject(HttpClient);

  public getTodos(): void {
    this._http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todos) => this.#todo.set(todos));
  }

  public updateTodo(todo: ITodo): void {
    this._http
      .put<ITodo>(
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
        },
      )
      .subscribe((updateID) => {
        this.#todo.update((todos) =>
          todos.map((todo) => (todo.id === updateID.id ? updateID : todo)),
        );
      });
  }

  deleteTodo(id: number): void {
    this._http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => {
        this.#todo.update((todo) => todo.filter((val) => val.id !== id));
      });
  }
}
