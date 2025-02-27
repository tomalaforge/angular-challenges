import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { Todo } from '../interfaces/todo.interface';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  template: `
    <div class="todo-item" [class.processing]="processing">
      <span [class.completed]="todo.completed">{{ todo.title }}</span>
      <div class="actions">
        <button (click)="updateTodo()" [disabled]="processing">Update</button>
        <button (click)="deleteTodo()" [disabled]="processing" class="delete">
          Delete
        </button>
        <mat-spinner *ngIf="processing" diameter="20"></mat-spinner>
      </div>
    </div>
  `,
  styles: [
    `
      .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #eee;
      }
      .completed {
        text-decoration: line-through;
        color: #888;
      }
      .processing {
        opacity: 0.7;
      }
      .actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .delete {
        background: #ff4444;
        color: white;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  processing = false;

  constructor(private todoService: TodoService) {}

  updateTodo() {
    this.processing = true;
    this.todoService
      .updateTodo(this.todo.id, {
        title: randText(),
        completed: this.todo.completed,
      })
      .subscribe({
        next: () => (this.processing = false),
        error: () => (this.processing = false),
      });
  }

  deleteTodo() {
    this.processing = true;
    this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => (this.processing = false),
      error: () => (this.processing = false),
    });
  }
}
