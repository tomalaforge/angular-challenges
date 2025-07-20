import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodo } from '../interfaces/todo.interface';
import { deleteTodo, updateTodo } from '../stores/todos.actions';
import {
  selectorFetchErroredLocal,
  selectorFetchErroredLocalMessage,
} from '../stores/todos.selectors';
import { AppLocalLoaderComponent } from './loader-local.component';

@Component({
  imports: [CommonModule, AppLocalLoaderComponent],
  providers: [],
  selector: 'app-item',
  template: `
    <div>
      @if (todo().isLoading) {
        <app-local-loader />
      } @else if (
        hasErroredLocal().status && hasErroredLocal().todoId === todo().id
      ) {
        <p style="color: red;">{{ hasErroredLocalMessage() }}</p>
      } @else {
        <span>{{ todo().title }}</span>
        <button (click)="onUpdateTodo(todo())" [disabled]="todo().isLoading">
          Update
        </button>
        <button (click)="onDeleteTodo(todo().id)" [disabled]="todo().isLoading">
          Delete
        </button>
      }
    </div>
  `,
  styles: `
    .isLoading {
      background-color: red;
    }
  `,
})
export class AppItemComponent {
  todo = input.required<ITodo>();
  private readonly store = inject(Store);
  public readonly hasErroredLocal = this.store.selectSignal(
    selectorFetchErroredLocal,
  );
  public readonly hasErroredLocalMessage = this.store.selectSignal(
    selectorFetchErroredLocalMessage,
  );

  onUpdateTodo(todo: ITodo) {
    this.store.dispatch(updateTodo({ todo }));
  }

  onDeleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
