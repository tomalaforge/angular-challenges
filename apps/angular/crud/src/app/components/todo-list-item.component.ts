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
import { TodoService } from '../services';

@Component({
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  selector: 'app-todo-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <mat-checkbox></mat-checkbox>
      <ng-content></ng-content>
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
  @Input() todo!: Todo;

  @Output() openDialog = new EventEmitter<void>();
  @Output() updateItemInArray = new EventEmitter<Todo>();
  @Output() removeItemInArray = new EventEmitter<Todo>();
  @Output() showErrorMessage = new EventEmitter<void>();

  constructor(private readonly todoService: TodoService) {}

  updateTodo(todo: Todo): void {
    this.openDialog.emit();
    this.todoService.update(todo).subscribe(
      (updatedTodo: Todo) => this.updateItemInArray.emit(updatedTodo),
      (error) => this.showErrorMessage.emit(),
    );
  }

  deleteTodo(todo: Todo): void {
    this.openDialog.emit();
    this.todoService.delete(todo).subscribe(
      () => this.removeItemInArray.emit(todo),
      (error) => this.showErrorMessage.emit(),
    );
  }
}
