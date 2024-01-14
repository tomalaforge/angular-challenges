import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { concatMap, exhaustMap, Observable, tap } from 'rxjs';
import { TodoHttpService } from '../http/todo-http.service';
import { TodoItem } from '../models/todo';

export interface AppState {
  isAppProcessing: boolean;
  todos: TodoItem[];
  processingTodos: Set<number>;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  constructor(private todoHttpService: TodoHttpService) {
    super({
      isAppProcessing: false,
      todos: [],
      processingTodos: new Set(),
    });
  }

  readonly isAppProcessing$ = this.select((state) => state.isAppProcessing);
  readonly todos$ = this.select((state) => state.todos);

  setTodoItemProcessing(id: number, flag: boolean) {
    this.patchState((state) => {
      if (flag) {
        state.processingTodos.add(id);
      } else {
        state.processingTodos.delete(id);
      }
      return state;
    });
  }

  isTodoItemProcessing(id: number): boolean {
    return this.state().processingTodos.has(id);
  }

  readonly getTodoItems = this.effect((trigger$) => {
    this.setState((state) => ({ ...state, isAppProcessing: true }));
    return trigger$.pipe(
      exhaustMap(() =>
        this.todoHttpService.getTodoList().pipe(
          tap((todos: TodoItem[]) => {
            this.setState((state) => ({
              ...state,
              todos,
              isAppProcessing: false,
            }));
          }),
        ),
      ),
    );
  });

  readonly updateTodoItem = this.effect((todoItem$: Observable<TodoItem>) => {
    return todoItem$.pipe(
      tap((todoItem) => this.setTodoItemProcessing(todoItem.id, true)),
      concatMap((todoItem) =>
        this.todoHttpService.updateTodoItem(todoItem).pipe(
          tap((updatedItem) => {
            this.setTodoItemProcessing(updatedItem.id, false);
            this.patchState((state) => {
              const prevIndex = state.todos.findIndex(
                (v) => v.id === todoItem.id,
              );
              if (prevIndex !== -1) state.todos[prevIndex] = updatedItem;
              return state;
            });
          }),
        ),
      ),
    );
  });

  readonly deleteTodoItem = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      tap((id) => this.setTodoItemProcessing(id, true)),
      concatMap((id) =>
        this.todoHttpService.deleteTodoItem(id).pipe(
          tap(() => {
            this.patchState((state) => {
              const prevIndex = state.todos.findIndex((v) => v.id === id);
              if (prevIndex !== -1) state.todos.splice(prevIndex, 1);
              return state;
            });
          }),
        ),
      ),
    );
  });
}
