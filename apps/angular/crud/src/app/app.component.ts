import { Component, inject } from '@angular/core';
import { TodoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    @if (todoStore.loading()) {
      <div>Loading</div>
    } @else if (todoStore.error()) {
      <div>{{ todoStore.error() }}</div>
    } @else {
      @for (todo of todoStore.entities(); track todo.id) {
        <div>
          {{ todo.title }}
          <button (click)="todoStore.update(todo)">Update</button>
          <button (click)="todoStore.delete(todo)">Delete</button>
        </div>
      }
    }
  `,
  styles: [],
  providers: [TodoStore],
})
export class AppComponent {
  readonly todoStore = inject(TodoStore);
}
