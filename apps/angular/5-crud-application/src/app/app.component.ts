import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './component/todo.component';
import { injectTodos } from './data-access/todo.query';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @switch (todosQuery.status()) {
      @case ('pending') {
        <mat-spinner [diameter]="20" color="blue" />
      }
      @case ('error') {
        Error has occured: {{ todosQuery.error() }}
      }
      @default {
        <div class="todo-container">
          @for (todo of todosQuery.data(); track todo.id) {
            <app-todo-item [todo]="todo" />
          }
        </div>
      }
    }
  `,
  styles: [
    `
      .todo-container {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todosQuery = injectTodos();
}
