import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Todo } from '../Model/todo';
import { TodosStore } from '../Store/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-todo-item',
  template: `
    <div>
      {{ todo().title }}
      <button (click)="update(todo())">Update</button>
      <button (click)="delete(todo())">Delete</button>
    </div>
  `,
  styles: [],
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  store = inject(TodosStore);

  onUpdate = output<Todo>();
  onDelete = output<Todo>();

  update(todo: Todo) {
    this.onUpdate.emit(todo);
  }

  delete(todo: Todo) {
    this.onDelete.emit(todo);
  }
}
