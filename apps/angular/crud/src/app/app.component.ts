import { Component, inject } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todoService.todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="todoService.update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent {
  readonly todoService = inject(TodoService);
}
