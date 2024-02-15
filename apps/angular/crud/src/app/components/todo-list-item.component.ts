import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Todo } from '../models';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  selector: 'app-todo-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <mat-checkbox></mat-checkbox>
      {{ todo.title }}
    </div>
    <div>
      @if (isLoading) {
        <mat-spinner diameter="20"></mat-spinner>
      } @else if (error) {
        <mat-icon>error</mat-icon>
      }
      <button (click)="updateTodo(todo)" [disabled]="isLoading">Update</button>
      <button (click)="deleteTodo(todo)" [disabled]="isLoading">Delete</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      & > div {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  `,
})
export class TodoListItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Input() isLoading: boolean = false;
  @Input() error: unknown = null;

  @Output() updateTodoEvent = new EventEmitter<Todo>();
  @Output() deleteTodoEvent = new EventEmitter<Todo>();

  updateTodo(updatedTodo: Todo): void {
    this.updateTodoEvent.emit(updatedTodo);
  }

  deleteTodo(todo: Todo): void {
    this.deleteTodoEvent.emit(todo);
  }
}
