import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, MatProgressSpinnerModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos!: Signal<Todo[]>;
  loading!: Signal<boolean>;
  errorMessage!: Signal<string | null>;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.todos$;
    this.loading = this.todoService.loading$;
    this.errorMessage = this.todoService.errorMessage$;
    this.todoService.getTodos().subscribe();
  }

  update = (todo: Todo) => this.todoService.updateTodo(todo).subscribe();

  delete = (todo: Todo) => this.todoService.deleteTodo(todo).subscribe();
}
