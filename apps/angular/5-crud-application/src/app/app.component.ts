import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { Todo, TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (loader()) {
      <mat-spinner></mat-spinner>
    } @else {
      @for (todo of todos(); track todo.id) {
        <div>
          {{ todo.title }}
          <button (click)="update(todo)">Update</button>
          <button (click)="delete(todo.id)">Delete</button>
        </div>
      } @empty {
        <div>No elements on Todo</div>
      }
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  public todos: Signal<Todo[]> = this.todoService.todos;
  public loader: Signal<boolean> = this.loaderService.loader;

  constructor(
    private todoService: TodoService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  update(todo: Todo) {
    this.todoService.update(todo);
  }

  delete(index: number) {
    this.todoService.delete(index);
  }
}
