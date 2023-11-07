import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="single-todo">
      <span class="title"> {{ todoItem.title }} </span>
      <div class="actions">
        <button
          class="update-btn"
          [disabled]="!!todoItem.disabled"
          (click)="updateToDo()">
          <ng-container *ngIf="!todoItem.isUpdating; else loading">
            Update
          </ng-container>
        </button>
        <button
          class="delete-btn"
          [disabled]="!!todoItem.disabled"
          (click)="deleteTodo()">
          <ng-container *ngIf="!todoItem.isDeleting; else loading">
            Delete
          </ng-container>
        </button>
      </div>
    </div>

    <ng-template #loading>
      <div class="spinner-container">
        <mat-spinner [diameter]="20"></mat-spinner>
      </div>
    </ng-template>
  `,
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
  styles: [
    `
      .title {
        font-size: 14px;
        font-weight: 500;
      }
      .single-todo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px;
        paddiing: 5px;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions button {
        margin: 5px;
        padding: 5px 15px;
        border: none;
        border-radius: 3px;
        min-width: 73px;
      }

      .update-btn {
        background-color: orange;
        color: white;
      }

      .update-btn:hover {
        background-color: white;
        color: orange;
        cursor: pointer;
        outline: 1px solid orange;
      }

      .delete-btn {
        background-color: red;
        color: white;
      }

      .delete-btn:hover {
        background-color: white;
        color: red;
        cursor: pointer;
        outline: 1px solid red;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() todoItem!: Todo;

  @Output() updateToDoEvent: EventEmitter<Todo> = new EventEmitter();
  @Output() deleteToDoEvent: EventEmitter<Todo> = new EventEmitter();

  updateToDo() {
    this.todoItem.disabled = true;
    this.todoItem.isUpdating = true;
    this.updateToDoEvent.emit(this.todoItem);
  }

  deleteTodo() {
    this.todoItem.disabled = true;
    this.todoItem.isDeleting = true;
    this.deleteToDoEvent.emit(this.todoItem);
  }
}
