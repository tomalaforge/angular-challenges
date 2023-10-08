import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { pipe, switchMap, tap } from 'rxjs';
import { AppStore } from './app.store';
import { TodoService } from './service/todo.service';
import { Todo } from './interfaces/Todo';

export interface TodoItemState {
  todo?: Todo;
  callState?: string;
}

@Injectable()
export class TodoItemStore extends ComponentStore<TodoItemState> {
  private todoService = inject(TodoService);
  private appStore = inject(AppStore);

  // replace with ngrxOnInit ? or constructor with super?
  // probably should use ngrxOnInit but I'll leave this
  ngOnInit() {
    this.setState({ todo: undefined, callState: '' });
  }

  readonly todo$ = this.select((state) => state.todo);
  readonly callState$ = this.select((state) => state.callState);

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      callState: this.callState$,
    },
    { debounce: true }
  );

  readonly update = this.effect<number>(
    pipe(
      tap(() => this.setState({ callState: 'Updating' })),
      switchMap((id) =>
        this.todoService.updateTodo(id).pipe(
          tapResponse(
            (todo: any) => {
              this.appStore.updateTodo(todo);
              this.setState({ callState: 'LOADED' });
            },
            (error: Error) => this.setState({ callState: error.message })
          )
        )
      )
    )
  );

  readonly deleteTodo = this.effect<number>(
    pipe(
      tap(() => this.setState({ callState: 'Deleting' })),
      switchMap((id) =>
        this.todoService.deleteTodo(id).pipe(
          tapResponse(
            () => {
              this.appStore.deleteTodoState(id);
              this.setState({ callState: 'LOADED' });
            },
            (error: Error) => this.setState({ callState: error.message })
          )
        )
      )
    )
  );
}
