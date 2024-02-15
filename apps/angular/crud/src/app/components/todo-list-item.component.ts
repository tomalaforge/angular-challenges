import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../models';

@Component({
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  selector: 'app-todo-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <mat-checkbox></mat-checkbox>
      {{ todo.title }}
    </div>
    <div>
      <button (click)="updateTodo(todo)">Update</button>
      <button (click)="deleteTodo(todo)">Delete</button>
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
        height: fit-content;
        gap: 10px;
      }
    }
  `,
})
export class TodoListItemComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() updateTodoEvent = new EventEmitter<Todo>();
  @Output() deleteTodoEvent = new EventEmitter<Todo>();

  updateTodo(updatedTodo: Todo): void {
    this.updateTodoEvent.emit(updatedTodo);
  }

  deleteTodo(todo: Todo): void {
    this.deleteTodoEvent.emit(todo);
  }
}
