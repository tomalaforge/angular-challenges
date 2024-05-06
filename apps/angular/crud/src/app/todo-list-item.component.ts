import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from './model/todo.model';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'app-todo-list-item',
  template: `
    <div class="list-item">
      <div class="list-item-content">
        @if (isSaving) {
          <mat-spinner [diameter]="16"></mat-spinner>
        } @else {
          <span class="title">ID {{ todo.id }} - {{ todo.title }}</span>
        }
      </div>
      <div class="list-item-actions">
        <button (click)="updateTodo(todo)" [disabled]="isSaving">Update</button>
        <button (click)="deleteTodo(todo)" [disabled]="isSaving">Delete</button>
      </div>
    </div>
  `,
})
export class TodoListItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() isSaving = false;

  @Output() updateTodoEvent = new EventEmitter<Todo>();
  @Output() deleteTodoEvent = new EventEmitter<Todo>();

  updateTodo(updatedTodo: Todo): void {
    this.updateTodoEvent.emit(updatedTodo);
  }

  deleteTodo(todo: Todo): void {
    this.deleteTodoEvent.emit(todo);
  }
}
