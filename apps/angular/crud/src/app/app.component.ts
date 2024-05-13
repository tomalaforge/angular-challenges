import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { tap } from 'rxjs';
import { Todo } from './models/todo.interface';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="isLoading"></mat-spinner>

    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);
  isLoading!: boolean;
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .pipe(tap(() => (this.isLoading = true)))
      .subscribe((todos) => {
        this.todos.set(todos);
        this.isLoading = false;
      });
  }

  delete(id: number) {
    this.todoService
      .deleteTodo(id)
      .pipe(tap(() => (this.isLoading = true)))
      .subscribe(() => {
        this.todos.set([...this.todos().filter((todo) => todo.id !== id)]);

        this.isLoading = false;
      });
  }

  update(todo: Todo) {
    this.todoService
      .updateTodo(String(todo.id), todo)
      .pipe(tap(() => (this.isLoading = true)))
      .subscribe((todoUpdated: Todo) => {
        this.todos.set([
          ...this.todos().map((todo) =>
            todo.id === todoUpdated.id ? todoUpdated : todo,
          ),
        ]);

        this.isLoading = false;
      });
  }
}
