import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <span>{{ title }}</span>
      <button class="update-btn" (click)="update.emit()">Update</button>
      <button class="delete-btn" (click)="delete.emit()">Delete</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() title!: string;
  @Output() update = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
