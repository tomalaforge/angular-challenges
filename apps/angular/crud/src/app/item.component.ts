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
        Update
      </button>
      <button (click)="delete.emit(todo())">Delete</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  todo = input.required<Todo>();
  index = input.required<number>();
  update = output<{ todo: Todo; index: number }>();
  delete = output<Todo>();
}
