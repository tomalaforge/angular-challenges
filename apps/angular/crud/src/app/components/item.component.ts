import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../model/todo.interface';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      {{ item.title }}
      <button
        [disabled]="disabledTodosIds?.includes(item.id)"
        (click)="update(item)">
        Update
      </button>
      <button
        [disabled]="disabledTodosIds?.includes(item.id)"
        (click)="delete(item)">
        Delete
      </button>
      <ng-container *ngIf="errorTodosIds?.includes(item.id)">
        Error occuried
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input({ required: true }) item!: Todo;
  @Input({ required: true }) disabledTodosIds!: number[] | null;
  @Input({ required: true }) errorTodosIds!: number[] | null;

  @Output() updateClicked = new EventEmitter<Todo>();
  @Output() deleteClicked = new EventEmitter<Todo>();

  update(todo: Todo): void {
    this.updateClicked.emit(todo);
  }

  delete(todo: Todo): void {
    this.deleteClicked.emit(todo);
  }
}
