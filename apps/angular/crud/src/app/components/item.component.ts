import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-item',
  template: `
    <div>
      {{ todo().title }}
      <button (click)="update()">Update</button>
      <button (click)="deletingTodo()">Delete</button>
    </div>
  `,
})
export class ItemComponent {
  todo = input({} as Todo);
  updateTodo = output<Todo>();
  deleteTodo = output<Todo>();

  update() {
    this.updateTodo.emit(this.todo());
  }

  deletingTodo() {
    this.deleteTodo.emit(this.todo());
  }
}
