import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Todo } from './todo.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  imports: [MatButtonModule],
  standalone: true,
  template: `
    {{ todo.title }}
    <button
      (click)="update.emit(todo)"
      [disabled]="laoding"
      mat-raised-button
      color="primary">
      Update
    </button>
    <button
      (click)="delete.emit(todo.id)"
      [disabled]="laoding"
      mat-raised-button
      color="warn">
      Delete
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 5px 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItem {
  @Input({ required: true }) todo!: Todo;
  @Input({ required: true }) laoding!: boolean;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
}
