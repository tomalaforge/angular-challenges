import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { Todo } from './todo.models';
import { TodoService } from './todo.service';
import { TodoStore } from './todo.store';

@Component({
  standalone: true,
  imports: [LoadingComponent],
  selector: 'app-root',
  template: `
    <app-loading />
    @for (todo of store.todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button
          [disabled]="loadingService.isLoading()"
          (click)="updateTodos(todo)">
          Update
        </button>
        <button
          [disabled]="loadingService.isLoading()"
          (click)="deleteTodo(todo)">
          Delete
        </button>
      </div>
    }
  `,
  providers: [TodoStore],
})
export class AppComponent {
  private readonly todoService = inject(TodoService);
  readonly loadingService = inject(LoadingService);
  private readonly destroyRef = inject(DestroyRef);
  readonly store = inject(TodoStore);

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService
      .getTodos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todos) => this.store.setTodos(todos));
  }

  updateTodos(todo: Todo): void {
    this.todoService
      .updateTodo(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((updatedTodo) => {
        this.store.updateTodo(updatedTodo);
      });
  }

  deleteTodo(todo: Todo): void {
    this.todoService
      .deleteTodo(todo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.store.deleteTodo(todo.id));
  }
}
