import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITodo } from './ITodo';
import { LoaderService } from './loader.service';
import { TodosService } from './todos.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="loader()"></mat-spinner>
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="updateTodo(todo)">Update</button>
      <button (click)="deleteTodo(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todoService = inject(TodosService);
  loaderService = inject(LoaderService);
  todos: Signal<ITodo[]> = this.todoService.todos;
  loader: Signal<boolean> = this.loaderService.loader;

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  updateTodo(todo: ITodo) {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
