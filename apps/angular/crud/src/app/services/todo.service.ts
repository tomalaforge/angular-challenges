import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { appModel, todo } from '../todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  _url = 'https://jsonplaceholder.typicode.com/todos/';

  appSignal = signal<appModel>({
    todos: [],
    // isError: null, //optional
    isLoading: false,
  });

  todoSignal = computed(() => this.appSignal().todos);
  loadingSignal = computed(() => this.appSignal().isLoading);

  constructor(private http: HttpClient) {}

  getAllTodos() {
    this.appSignal.update((value) => ({ ...value, isLoading: true }));
    return this.http.get<todo[]>(this._url).subscribe({
      next: (todos) => {
        this.appSignal.set({
          todos: todos,
          // isError: null,  //optional
          isLoading: false,
        });
      },
    });
  }

  update(todo: todo) {
    this.appSignal.update((value) => ({ ...value, isLoading: true }));
    this.http
      .put<todo>(
        this._url + todo.id,
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
      .subscribe({
        next: (todoUpdate: todo) => {
          const todos = this.appSignal().todos.map((t) =>
            t.id === todoUpdate.id ? todoUpdate : t,
          );
          this.appSignal.update((value) => ({
            ...value,
            todos: todos,
            isLoading: false,
          }));
        },
      });
  }

  delete(id: number) {
    this.appSignal.update((value) => ({ ...value, isLoading: true }));
    this.http.delete<number>(this._url + id).subscribe({
      next: () => {
        const todos = this.appSignal().todos.filter((t) => t.id !== id);
        this.appSignal.update((value) => ({
          ...value,
          todos: todos,
          isLoading: false,
        }));
      },
    });
  }

  handleError() {
    this.appSignal.update((value) => ({
      ...value,
      // isError: error,
      isLoading: false,
    }));
  }
}
