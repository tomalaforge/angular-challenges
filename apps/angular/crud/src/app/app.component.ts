import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ITodo } from './ITodo';
import { LoaderService } from './loader.service';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  selector: 'app-root',
  template: `
    @if (loader()) {
      <mat-spinner></mat-spinner>
    }
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo.id)">Delete</button>
      </div>
    } @empty {
      <div>There is no todo</div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private todoService = inject(TodoService);
  private loaderService = inject(LoaderService);
  todos: Signal<ITodo[]> = this.todoService.todos;
  loader: Signal<boolean> = this.loaderService.loader;

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  update(todo: ITodo) {
    this.todoService.updateTodo(todo);
  }

  delete(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
