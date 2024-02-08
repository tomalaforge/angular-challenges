import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { TodoService } from './services/todo.service';
import { todo } from './todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <!-- 
    // this is optional  
    @if (isError) {
      <p class="error">{{ isError }}</p>
    } -->
    @if (isLoading) {
      <mat-spinner></mat-spinner>
    }
    <div *ngFor="let todo of todos$">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$!: todo[];
  // isError!: string | null;
  isLoading!: boolean;

  constructor(private todoService: TodoService) {
    effect(() => {
      // const { todos, isError, isLoading } = this.todoService.appSignal();
      const { todos, isLoading } = this.todoService.appSignal();
      this.todos$ = todos;
      // this.isError = isError;
      this.isLoading = isLoading;
    });
  }
  ngOnInit(): void {
    this.todoService.getAllTodos();
  }

  update(todo: todo) {
    this.todoService.update(todo);
  }

  delete(id: number) {
    this.todoService.delete(id);
  }
}
