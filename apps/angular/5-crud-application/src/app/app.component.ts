import { Component, computed, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loadingState()) {
      <
      <mat-spinner />
    } @else if (errorState()) {
      <p>{{ errorState() }}</p>
    } @else {
      <p>Todo List:</p>
      <ul>
        @for (todo of todoList(); track todo.id) {
          <li>
            {{ todo.title }}
            <button (click)="update(todo)">Update</button>
            <button (click)="delete(todo.id)">delete</button>
          </li>
        }
      </ul>
    }
  `,
  styles: [],
})
export class AppComponent {
  private readonly todoService = inject(TodoService);
  readonly todos = this.todoService.todos;
  protected readonly todoList = computed(() => this.todoService.todos() || []);
  loadingState = this.todoService.loadingState;
  errorState = this.todoService.errorState;

  ngOnInit(): void {
    this.todoService.loadTodos();
  }

  update(todo: Todo): void {
    const updatedTodo = { ...todo, title: randText() };
    this.todoService.updateTodo(updatedTodo);
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
