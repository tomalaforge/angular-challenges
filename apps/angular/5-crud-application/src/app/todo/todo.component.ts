import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { todo } from './todo.model';
import { TodoStore } from './todo.store';

@Component({
  imports: [MatProgressSpinnerModule, CommonModule, TodoItemComponent],
  selector: 'app-todo',
  template: `
    @if (store.isLoading$ | async) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of store.todos$ | async; track todo.id) {
        <app-todo-item
          [todo]="todo"
          [isProcessing]="(store.isTodoProcessing$(todo.id) | async) ?? false"
          [error]="store.todoError$(todo.id) | async"
          (update)="update($event)"
          (delete)="delete($event)"></app-todo-item>
      }
    }
  `,
})
export class TodoComponent implements OnInit {
  constructor(readonly store: TodoStore) {}

  ngOnInit() {
    this.store.loadTodos();
  }

  update(todo: todo) {
    this.store.updateTodo(todo);
  }

  delete(todo: todo) {
    this.store.deleteTodo(todo);
  }
}
