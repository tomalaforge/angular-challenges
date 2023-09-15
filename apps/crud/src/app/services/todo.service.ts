import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoItem } from '../models/todo.model';
import { TodoApiService } from './todo-api.service';
import {
  catchError,
  concatMap,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface TodoStoreState {
  todos: TodoItem[];
  isLoading: boolean;
}

const initialState: TodoStoreState = {
  todos: [],
  isLoading: false,
};

@Injectable()
export class TodoService extends ComponentStore<TodoStoreState> {
  private $todos = this.select((state) => state.todos);
  private $isLoading = this.select((state) => state.isLoading);

  public viewModel$ = this.select(
    this.$todos,
    this.$isLoading,
    (todos, isLoading) => {
      return {
        todos,
        isLoading,
      };
    }
  );

  constructor(private api: TodoApiService) {
    super(initialState);
  }

  deleteTodo = this.effect((generator: Observable<TodoItem>) => {
    return generator.pipe(
      tap((todoItem) => {
        this.clearItemErrorMessage(todoItem.id);
        this.startProcessingItem(todoItem.id);
      }),
      concatMap((todoItem) =>
        this.api.deleteTodo(todoItem.id).pipe(
          map(() => false),
          catchError(() => {
            this.setItemErrorMessage(todoItem.id);
            return of(true);
          }),
          tap((hasError) => !hasError && this.deleteItem(todoItem.id)),
          finalize(() => this.stopProcessingItem(todoItem.id))
        )
      )
    );
  });

  updateTodo = this.effect((generator: Observable<TodoItem>) => {
    return generator.pipe(
      tap((todoItem) => {
        this.clearItemErrorMessage(todoItem.id);
        this.startProcessingItem(todoItem.id);
      }),
      concatMap((todoItem) =>
        this.api.update(todoItem).pipe(
          catchError(() => {
            this.setItemErrorMessage(todoItem.id);
            return of(todoItem);
          }),
          tap((updatedTodo) => this.updateItem(updatedTodo)),
          finalize(() => this.stopProcessingItem(todoItem.id))
        )
      )
    );
  });

  loadTodos = this.effect((o) => {
    return o.pipe(
      switchMap(() => {
        this.showLoading();
        return this.api.getTodos().pipe(
          finalize(() => this.hidLoading()),
          tap((data) => {
            this.setTodos(data);
          })
        );
      })
    );
  });

  private setTodos = this.updater((state, todos: TodoItem[]) => {
    return {
      ...state,
      todos: [...todos],
    };
  });

  private showLoading = this.updater((state) => {
    return {
      ...state,
      isLoading: true,
    };
  });

  private hidLoading = this.updater((state) => {
    return {
      ...state,
      isLoading: false,
    };
  });

  private deleteItem = this.updater((state, todoId: number) => {
    return {
      ...state,
      todos: [...state.todos.filter((todo) => todo.id !== todoId)],
    };
  });

  private startProcessingItem = this.updater((state, itemId: number) => {
    return this.updateItemState(state, { id: itemId, isProcessing: true });
  });

  private stopProcessingItem = this.updater((state, itemId: number) => {
    return this.updateItemState(state, { id: itemId, isProcessing: false });
  });

  private setItemErrorMessage = this.updater((state, itemId: number) => {
    return this.updateItemState(state, {
      id: itemId,
      errorMessage: `An error accoured during processing the request. please try again.`,
    });
  });

  private clearItemErrorMessage = this.updater((state, itemId: number) => {
    return this.updateItemState(state, {
      id: itemId,
      errorMessage: '',
    });
  });

  private updateItem = this.updater((state, updated: TodoItem) => {
    return this.updateItemState(state, updated);
  });

  private updateItemState = (
    state: TodoStoreState,
    updated: { id: number } & Partial<TodoItem>
  ) => {
    const todoList = state.todos;
    const existsTodo = todoList.find((t) => t.id === updated.id);

    if (!existsTodo) throw new Error(`No item found with id ${updated.id}`);

    const existingIndex = todoList.indexOf(existsTodo);

    todoList.splice(existingIndex, 1, { ...existsTodo, ...updated });

    return {
      ...state,
      todos: [...todoList],
    };
  };
}
