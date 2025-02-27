import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;
  @Input() loadingIds!: number[];
  @Input() isProcessing!: boolean;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  updateTodo() {
    this.update.emit(this.todo);
  }

  deleteTodo() {
    this.delete.emit(this.todo);
  }
}
