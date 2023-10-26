import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="single-todo">
      <span> {{ todoItem.title }} </span>
      <div class="actions">
        <button [disabled]="!!todoItem.disabled" (click)="updateToDo()">
          Update
        </button>
        <button [disabled]="!!todoItem.disabled" (click)="deleteTodo()">
          Delete
        </button>
      </div>
    </div>
  `,
  standalone: true,
  styles: [
    `
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
        padding: 5px 10px;
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
