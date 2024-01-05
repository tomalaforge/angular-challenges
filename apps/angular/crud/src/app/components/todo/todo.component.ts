import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../services/todo.service';

@Component({
  standalone: true,
  selector: 'app-todo',
  template: `
    {{ todo.title }}
    <button (click)="update.emit(todo)">Update</button>
    <button (click)="delete.emit(todo.id)">Delete</button>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TodoComponent {
  @Input()
  todo: Todo = <Todo>{};

  @Output()
  update: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();
}
