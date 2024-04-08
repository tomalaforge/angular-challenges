import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LOADING } from './loading.token';
import { Todo, TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id; let index = $index) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo, index)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }

    @if (loading()) {
      <div class="spinner">
        <mat-spinner></mat-spinner>
      </div>
    }
  `,
  styles: [
    `
      .spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class AppComponent {
  private service = inject(TodoService);
  todos = this.service.todos;
  loading = inject(LOADING);

  update = (todo: Todo, index: number) => this.service.updateTodo(todo, index);
  delete = (todo: Todo) => this.service.deleteTodo(todo);
}
