import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, throwError } from 'rxjs';
import { Todo, UpdatedTodo } from './app.model';
import { TodoService } from './app.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (errorMessage()) {
      {{ errorMessage() }}
    }
    @if (isLoading()) {
      <mat-spinner></mat-spinner>
    } @else {
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  private todoService = inject(TodoService);
  protected isLoading = signal<boolean>(false);
  protected errorMessage = signal<string>('');

  constructor() {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.isLoading.set(false);
    this.errorMessage.set(error.message);
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }

  update(todo: Todo) {
    this.isLoading.set(true);
    this.todoService
      .updateTodo(todo.id)
      .pipe(catchError(this.handleError))
      .subscribe((todoUpdated: UpdatedTodo) => {
        this.todos = this.todos.map((t) => {
          if (t.id !== todo.id) {
            return t;
          } else {
            return {
              ...t,
              title: todoUpdated.title,
            };
          }
        });
        this.isLoading.set(false);
      });
  }

  delete(todo: Todo) {
    this.isLoading.set(true);
    this.todoService
      .deleteTodo(todo.id)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
        this.isLoading.set(false);
      });
  }
}
