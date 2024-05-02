import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './todo-item.component';
import { TodoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [MatProgressSpinner, TodoItemComponent],
  selector: 'app-root',
  template: `
    @if (todoStore.loading()) {
      <mat-progress-spinner class="example-margin" mode="indeterminate" />
    } @else if (todoStore.error()) {
      <div>{{ todoStore.error() }}</div>
    } @else {
      @for (todo of todoStore.entities(); track todo.id) {
        <app-todo-item [todo]="todo" />
      }
    }
  `,
  styles: [],
  providers: [TodoStore],
})
export class AppComponent {
  readonly todoStore = inject(TodoStore);
}
