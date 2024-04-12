import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './item.component';
import { LOADING } from './loading.token';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    @for (todo of service.todos(); track todo.id; let index = $index) {
      <app-item
        [todo]="todo"
        [index]="index"
        (delete)="service.deleteTodo(todo)"
        (update)="service.updateTodo(todo, index)" />
    }

    @if (globalLoading()) {
      <div class="spinner">
        <mat-spinner></mat-spinner>
      </div>
    }
  `,
  styles: [
    `
      .spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected service = inject(TodoService);
  globalLoading = inject(LOADING);
}
