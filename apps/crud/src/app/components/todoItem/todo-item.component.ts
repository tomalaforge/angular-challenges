import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `<div class="item-container">
      <mat-progress-spinner
        diameter="20"
        mode="indeterminate"
        *ngIf="todo.isProcessing"></mat-progress-spinner>
      <div>
        {{ todo.title }}
        <button
          (click)="todoService.updateTodo(todo)"
          [disabled]="todo.isProcessing">
          Update
        </button>
        <button
          (click)="todoService.deleteTodo(todo)"
          [disabled]="todo.isProcessing">
          Delete
        </button>
      </div>
    </div>
    <small class="error" *ngIf="todo.errorMessage">
      {{ todo.errorMessage }}
    </small>`,
  styles: [
    `
      .item-container {
        display: flex;
        gap: 10px;
      }

      .error {
        color: red;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input()
  todo!: TodoItem;
  constructor(public todoService: TodoService) {}
}
