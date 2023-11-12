import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Todo } from '../../../core/entity/todo.interface';

@Component({
  selector: 'app-todo-item',
  template: ` <div>
    {{ todo.title }}
    <button (click)="update(todo)">Update</button>
  </div>`,
  styles: [``],
  imports: [NgForOf],
  standalone: true,
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() onUpdateTodo = new EventEmitter<Todo>();

  update(todo: Todo) {
    this.onUpdateTodo.emit(todo);
  }
}
