import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';

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
          Update
        </button>
        <button
          class="delete-btn"
          [disabled]="!!todoItem.disabled"
          (click)="deleteTodo()">
          Delete
        </button>
      </div>
    </div>
  `,
  standalone: true,
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
  @Input() todoItem!: ITodo;

  @Output() updateToDoEvent: EventEmitter<ITodo> = new EventEmitter();
  @Output() deleteToDoEvent: EventEmitter<ITodo> = new EventEmitter();

  updateToDo() {
    this.todoItem.disabled = true;
    this.updateToDoEvent.emit(this.todoItem);
  }

  deleteTodo() {
    this.todoItem.disabled = true;
    this.deleteToDoEvent.emit(this.todoItem);
  }
}
