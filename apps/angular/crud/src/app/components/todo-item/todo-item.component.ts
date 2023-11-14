import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../types/todo';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() updateTodo = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  public update(todo: Todo) {
    this.updateTodo.emit(todo);
  }

  public delete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
