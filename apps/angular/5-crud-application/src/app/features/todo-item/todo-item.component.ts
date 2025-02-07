import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../core/todo.service';
import { Todo } from '../../todo.interface';

@Component({
  selector: 'app-todo-item',
  imports: [MatButtonModule, MatIconModule, MatCard],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  constructor(private service: TodoService) {}

  updateTodo(): void {
    const updated = { ...this.todo, completed: !this.todo.completed };
    this.service.updateTodo(updated).subscribe();
  }

  deleteTodo(): void {
    this.service.deleteTodo(this.todo.id).subscribe();
  }
}
