import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { ComponentStore } from '@ngrx/component-store';
import { Todo } from '../model/todo.interface';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  disabledTodosIds: number[];
  errorTodosIds: number[];
}

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  constructor(private http: HttpClient) {
    super({
      todos: [],
      loading: false,
      error: null,
      disabledTodosIds: [],
      errorTodosIds: [],
    });
  }

  load() {
    this.patchState({ loading: true, error: null });
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (todos) => {
          this.patchState({ todos, loading: false });
        },
        error: (error) => {
          this.patchState({ loading: false, error: JSON.stringify(error) });
        },
      });
  }

  update(todo: Todo): void {
    this.patchState((state) => {
      return {
        disabledTodosIds: [...state.disabledTodosIds, todo.id],
        errorTodosIds: state.errorTodosIds.filter((id) => id !== todo.id),
      };
    });
    this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )

      .subscribe({
        next: (todoUpdated: Todo) => {
          this.patchState((state) => {
            const currentTodos = state.todos;
            const index = currentTodos.findIndex(
              (todo) => todo.id === todoUpdated.id
            );

            if (index > -1) {
              const newTodos = [...currentTodos];
              newTodos[index] = todoUpdated;
              return {
                todos: newTodos,
                disabledTodosIds: state.disabledTodosIds.filter(
                  (id) => id !== todo.id
                ),
              };
            }
            return {};
          });
        },
        error: (err) => {
          this.patchState((state) => {
            return {
              errorTodosIds: [...state.errorTodosIds, todo.id],
              disabledTodosIds: state.disabledTodosIds.filter(
                (id) => id !== todo.id
              ),
            };
          });
        },
      });
  }

  delete(id: number): void {
    this.patchState((state) => {
      return {
        disabledTodosIds: [...state.disabledTodosIds, id],
      };
    });

    this.http
      .delete<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe({
        next: () => {
          this.patchState((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
            disabledTodosIds: state.disabledTodosIds.filter((id) => id !== id),
          }));
        },
        error: () => {
          this.patchState((state) => {
            return {
              errorTodosIds: [...state.errorTodosIds, id],
              disabledTodosIds: state.disabledTodosIds.filter(
                (id) => id !== id
              ),
            };
          });
        },
      });
  }
}
