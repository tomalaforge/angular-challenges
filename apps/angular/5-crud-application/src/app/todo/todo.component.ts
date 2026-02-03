import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { todo } from './todo.model';
import { TodoStore } from './todo.store';

@Component({
  imports: [MatProgressSpinnerModule, CommonModule],
  selector: 'app-todo',
  template: `
    @if (isLoading$ | async) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of todos$ | async; track todo.id) {
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      }
    }
  `,
  styles: [],
})
export class TodoComponent implements OnInit {
  readonly todos$ = this.store.todos$;
  readonly isLoading$ = this.store.isLoading$;

  constructor(private store: TodoStore) {}

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
