import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, NgIf],
  template: `<p>{{ todo.title }}</p>
    <button
      [disabled]="loading && todo.id !== selectedId"
      (click)="update(todo)">
      Update
    </button>
    <button
      [disabled]="loading && todo.id !== selectedId"
      (click)="remove(todo)">
      Delete
    </button>
    <ng-container *ngIf="loading && this.selectedId">{{
      status
    }}</ng-container> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() loading!: boolean;
  @Output() deleteTodoEvent = new EventEmitter<number>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  selectedId = 0;

  status = '';

  update(todo: Todo) {
    this.selectedId = todo.id;
    this.status = 'updating Todo';
    this.updateTodoEvent.emit();
  }

  remove(todo: Todo) {
    this.selectedId = todo.id;
    this.status = 'deleting Todo';
    this.deleteTodoEvent.emit();
  }
}
