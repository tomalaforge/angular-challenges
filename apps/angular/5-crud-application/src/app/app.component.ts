import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './components/todo-item.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, MatProgressSpinner],
  template: `
    <div class="container">
      <h1>Todo List</h1>

      @if (todoService.loading()) {
        <mat-spinner class="loader"></mat-spinner>
      }

      @if (todoService.error()) {
        <div class="error">
          {{ todoService.error() }}
        </div>
      }

      @for (todo of todoService.todos(); track todo.id) {
        <app-todo-item [todo]="todo"></app-todo-item>
      }
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 0 1rem;
      }
      .loader {
        margin: 2rem auto;
      }
      .error {
        color: #ff4444;
        padding: 1rem;
        border: 1px solid #ff4444;
        border-radius: 4px;
        margin: 1rem 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe();
  }
}
