import { Component, inject, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodoItemStore } from './todo-item.store';
import { Todo } from './types';

@Component({
  standalone: true,
  imports: [MatProgressSpinner],
  selector: 'app-todo-item',
  template: `
    <div>
      @if (todoStore.loading()) {
        <mat-progress-spinner
          class="example-margin"
          mode="indeterminate"
          diameter="20" />
      }

      {{ todo().title }}
      <button
        [disabled]="todoStore.onHold()"
        (click)="todoStore.update(todo())">
        Update
      </button>
      <button
        [disabled]="todoStore.onHold()"
        (click)="todoStore.delete(todo())">
        Delete
      </button>

      @if (todoStore.error()) {
        {{ todoStore.error() }}
      }
    </div>
  `,
  styles: [],
  providers: [TodoItemStore],
})
export class TodoItemComponent {
  readonly todoStore = inject(TodoItemStore);
  readonly todo = input.required<Todo>();
}
