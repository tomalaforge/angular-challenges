import { Component, OnInit, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Todo } from '../../models/todo.model';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { TodoStore } from '../../stores/todo.store';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoItemComponent,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoStore],
})
export class TodoListComponent implements OnInit {
  todoStore = inject(TodoStore);
  todos$ = this.todoStore.todos$;
  loadingIds$ = this.todoStore.loadingIds$;
  error$ = this.todoStore.error$;
  processingId = signal<number | null>(null);

  ngOnInit(): void {
    this.todoStore.loadTodos();
  }

  update(todo: Todo) {
    this.processingId.set(todo.id);
    this.todoStore.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.processingId.set(todo.id);
    this.todoStore.deleteTodo(todo);
  }

  isProcessing = (id: number) => this.processingId() === id;
}
