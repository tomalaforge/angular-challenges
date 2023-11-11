import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <mat-spinner *ngIf="loader$ | async"></mat-spinner>
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public todos$: Observable<Todo[]> = this.todoService.todos$;
  public loader$: Observable<boolean> = this.loaderService.loader$;

  constructor(
    private todoService: TodoService,
    private loaderService: LoaderService
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
