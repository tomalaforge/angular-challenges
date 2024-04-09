import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from './todo.service';

@Component({
  standalone: true,
  selector: 'app-item',
  template: `
    <div>
      {{ todo().title }}
      <button (click)="update.emit({ todo: todo(), index: index() })">
        {{ loading() ? 'Loading...' : 'Update' }}
      </button>
      <button (click)="delete.emit(todo())">
        {{ loading() ? 'Loading...' : 'Delete' }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  todo = input.required<Todo>();
  index = input.required<number>();
  loading = input.required<boolean>();
  update = output<{ todo: Todo; index: number }>();
  delete = output<Todo>();
}
