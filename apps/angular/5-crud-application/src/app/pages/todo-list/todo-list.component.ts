import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';

import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Signal<Todo[]> = this.todoStore.todos;

  constructor(private todoStore: TodoStore) {}

  ngOnInit(): void {
    this.todos = this.todoService.todos$;
    this.todoService.getTodos().subscribe();
  }
}
