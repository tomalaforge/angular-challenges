import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { TodoItemComponent } from './todo-item.component';
import { todoKeys } from './todo.factory';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, TodoItemComponent],
  selector: 'app-todos',
  template: `
    @switch (todos.status()) {
      @case ('pending') {
        <mat-spinner [diameter]="20" color="blue" />
      }
      @case ('error') {
        Error has occured: {{ todos.error() }}
      }
      @default {
        <div class="todo-container">
          @for (todo of todos.data(); track todo.id) {
            <app-todo-item [todo]="todo" />
          }
        </div>
      }
    }
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todoService = inject(TodoService);

  todos = injectQuery(() => ({
    queryKey: todoKeys.all,
    queryFn: async (): Promise<Array<Todo>> => {
      return lastValueFrom(this.todoService.getAllTodo());
    },
  }));
}
