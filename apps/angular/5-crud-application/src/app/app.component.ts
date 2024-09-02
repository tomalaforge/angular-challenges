import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemComponent } from './item.component';
import { ITodo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, ItemComponent, MatProgressSpinnerModule],
  selector: 'app-root',
  providers: [],
  template: `
    <div>
      <mat-spinner *ngIf="loading()"></mat-spinner>
      <app-item
        *ngFor="let todo of todos()"
        [todo]="todo"
        (todoUpdated)="onTodoUpdated($event)"
        (todoDeleted)="onTodoDeleted($event)"></app-item>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  // Signal to hold the list of todos
  private todoList = signal<ITodo[]>([]);

  // Computed signal to expose the list of todos
  todos = computed(() => this.todoList());

  loading = signal<boolean>(false);

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.loading.set(true);
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todoList.set(todos);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.showError(error.message);
      },
    });
  }

  onTodoUpdated(updatedTodo: ITodo) {
    this.todoList.update((todos) =>
      todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
    );
  }

  onTodoDeleted(deletedTodoId: number) {
    this.todoList.update((todos) =>
      todos.filter((t) => t.id !== deletedTodoId),
    );
  }

  private showError(message: string): void {
    console.log('message', message);
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
