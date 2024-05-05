import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosStore } from './app.store';

export interface Todo {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <div class="global-spinner">
        <h1>Loading...</h1>
        <mat-spinner></mat-spinner>
      </div>
    }
    @for (todo of todos(); track $index) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="deleteTodo(todo)">Delete</button>
      </div>
    }
  `,
  styles: `
    .global-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 30%;
      left: 50%;
    }
  `,
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  todos = this.store.todos;
  isLoading = this.store.isLoading;

  ngOnInit(): void {
    this.store.loadAll();
  }

  update(todo: Todo) {
    // this.todosService.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    // this.todosService.deleteTodo(todo);
  }
}
