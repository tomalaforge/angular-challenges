import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loadingSignal()) {
      <mat-spinner></mat-spinner>
    } @else {
      <div *ngFor="let todo of todosSignal()">
        {{ todo.title }}
        <button (click)="updateTodo(todo)">Update</button>
        <button (click)="deleteTodo(todo.id)">Delete</button>
      </div>
    }
  `,
  styles: [],
  providers: [],
})
export class AppComponent implements OnInit {
  todosSignal = this.todoService.todosSignal;
  loadingSignal = this.todoService.loadingSignal;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      const updatedTodos = this.todosSignal().filter(
        (todo) => todo.id !== todoUpdated.id,
      );
      this.todosSignal.set(updatedTodos);
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      const allTodos = this.todosSignal().filter((t) => t.id !== id);
      this.todosSignal.set(allTodos);
    });
  }
}
