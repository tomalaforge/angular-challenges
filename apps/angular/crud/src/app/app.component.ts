import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoService } from './services/todo.service';
import { todo } from './todo.model';
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
    @if (isLoading()) {
      <mat-spinner></mat-spinner>
    }
    @for (todo of todos$(); track $index) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo.id)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$: Signal<todo[]> = this.todoService.todoSignal;
  isLoading: Signal<boolean> = this.todoService.loadingSignal;

  constructor(private todoService: TodoService) {}

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
