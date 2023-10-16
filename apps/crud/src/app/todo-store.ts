import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  tapResponse,
} from '@ngrx/component-store';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoService } from './todo.service';

interface TodoState {
  todos: Todo[];
  loadingAllTodos: boolean;
  loadingSingleTodo: boolean;
  error: string;
}

const initialTodoState: TodoState = {
  todos: [],
  loadingAllTodos: false,
  loadingSingleTodo: false,
  error: '',
};

@Injectable({
  providedIn: 'root',
})
export class TodoStore
  extends ComponentStore<TodoState>
  implements OnStateInit
{
  constructor() {
    super(initialTodoState);
  }

  todos$ = this.select((s) => s.todos);
  loadingAllTodos$ = this.select((s) => s.loadingAllTodos);
  loadingSingleTodo$ = this.select((s) => s.loadingSingleTodo);
  error$ = this.select((s) => s.error);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      loadingAllTodos: this.loadingAllTodos$,
      loadingSingleTodo: this.loadingSingleTodo$,
      error: this.error$,
    },
    { debounce: true }
  );

  private todoService = inject(TodoService);

  addTodos = this.updater((state, todos: Todo[]) => ({
    ...state,
    todos,
  }));

  updateTodos = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  deleteTodos = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== todo.id),
  }));

  setLoadingAllTodos = this.updater((state, value: boolean) => ({
    ...state,
    loadingAllTodos: value,
  }));

  setLoadingSingleTodo = this.updater((state, value: boolean) => ({
    ...state,
    loadingSingleTodo: value,
  }));

  setErrorState = this.updater((state, error: string) => ({
    ...state,
    error,
  }));

  fetchTodos = this.effect<void>(
    pipe(
      tap(() => this.setLoadingAllTodos(true)),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          tap(() => this.setLoadingAllTodos(false)),
          tapResponse(
            (todos) => this.addTodos(todos),
            (error: HttpErrorResponse) => this.setErrorState(error.message)
          )
        )
      )
    )
  );

  updateTodo = this.effect<Todo>(
    pipe(
      tap(() => this.setLoadingSingleTodo(true)),
      switchMap((todo) =>
        this.todoService.updateTodos(todo).pipe(
          tap(() => this.setLoadingAllTodos(false)),
          tapResponse(
            (todos) => this.updateTodos(todos),
            (error: HttpErrorResponse) => this.setErrorState(error.message)
          )
        )
      )
    )
  );

  ngrxOnStateInit() {
    console.log('aer you bein gclae');
    this.fetchTodos();
  }
}

/*
 <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner [diameter]="40" color="accent" *ngIf="vm.loading">
      </mat-spinner>

      <ng-container *ngIf="vm.error; else noerror">
        Something went wrong!
      </ng-container>

      <ng-template #noerror>
        <app-todo-item
          [todo]="todo"
          [laoding]="vm.loading"
          (update)="updateTodo($event)"
          (delete)="deleteToDo($event)"
          *ngFor="let todo of vm.todos" />
      </ng-template>
    </ng-container>



*/
