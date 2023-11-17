import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../model/todo.interface';
import { TodoItemService } from './todo-item.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <span aria-label="title">
        {{ item.title }}
      </span>
      <button
        aria-label="update button"
        [disabled]="loading$ | async"
        (click)="update(item)">
        Update
      </button>
      <button
        aria-label="delete button"
        [disabled]="loading$ | async"
        (click)="delete(item)">
        Delete
      </button>
      <ng-container *ngIf="error"> Error occuried </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoItemService],
})
export class ItemComponent {
  @Input({ required: true }) item!: Todo;
  @Output() itemDeleted = new EventEmitter<number>();

  loading$ = this.todoItemService.loading$;
  error: string | null = null;

  constructor(private readonly todoItemService: TodoItemService) {}

  update(todo: Todo): void {
    this.todoItemService.update(todo).subscribe({
      next: (res) => {
        this.item = res;
      },
      error: (err: HttpErrorResponse) => (this.error = err.message),
    });
  }

  delete(todo: Todo): void {
    this.todoItemService.delete(todo.id).subscribe({
      next: () => {
        this.itemDeleted.emit(todo.id);
      },
      error: (err: HttpErrorResponse) => (this.error = err.message),
    });
  }
}
