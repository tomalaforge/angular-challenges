import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoListService } from './data-access/todo-list.service';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-root',
  imports: [MatProgressSpinnerModule],
  template: `
    @if (loading()) {
      <div class="overlay">
        <mat-progress-spinner mode="indeterminate" diameter="48" />
      </div>
    }

    <main class="page">
      <h1>Todo list</h1>

      @if (todos().length === 0) {
        <p class="muted">Loading...</p>
      } @else {
        <ul class="list">
          @for (todo of todos(); track todo.id) {
            <li class="item">
              <div>
                <p class="muted">#{{ todo.id }} · User {{ todo.userId }}</p>
                <p class="title">{{ todo.title }}</p>
              </div>
              <div class="actions">
                <button type="button" class="btn" (click)="update(todo)">
                  Update
                </button>
                <button
                  type="button"
                  class="btn btn-delete"
                  (click)="delete(todo)">
                  Delete
                </button>
              </div>
            </li>
          }
        </ul>
      }
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family:
          system-ui,
          -apple-system,
          'Segoe UI',
          sans-serif;
        color: #0f172a;
        padding: 16px;
      }
      .page {
        max-width: 720px;
        margin: 0 auto;
      }
      h1 {
        margin: 0 0 10px;
        font-size: 24px;
      }
      .muted {
        margin: 0;
        color: #64748b;
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 8px;
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #e5e7eb;
        background: #f8fafc;
      }
      .title {
        margin: 6px 0 0;
        font-weight: 600;
      }
      .actions {
        display: flex;
        gap: 8px;
      }
      .btn {
        border: none;
        background: #475569;
        color: #fff;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: opacity 120ms ease;
      }
      .btn-delete {
        background: #ef4444;
      }
      .btn:hover {
        opacity: 0.9;
      }
      .overlay {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(2px);
        z-index: 10;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoListService);
  todos = this.todoService.todos;
  loading = this.todoService.loading;

  ngOnInit(): void {
    this.todoService.loadTodos();
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
