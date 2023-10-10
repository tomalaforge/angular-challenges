import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div *ngIf="loader$ | async" class="overlay">
      <mat-progress-spinner
        class="spinner"
        diameter="200"
        color="accent"></mat-progress-spinner>
    </div>
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        border-top: 4px solid #3498db;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loader$ = this.loaderService.loader$;
  todos$ = this.todoService.todo$;
  constructor(
    private todoService: TodoService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.todoService.getAllTodo();
  }
  update(todo: Todo) {
    this.todoService.update(todo);
  }
  delete(todo: Todo) {
    this.todoService.delete(todo);
  }
}
