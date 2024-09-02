import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { randText } from '@ngneat/falso';
import { ITodo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-item',
  template: `
    <div>
      {{ todo.title }}
      <button (click)="onUpdate()" [disabled]="loading()">Update</button>
      <button (click)="onDelete()" [disabled]="loading()">Delete</button>
    </div>
  `,
  styles: [],
})
export class ItemComponent {
  @Input() todo!: ITodo;
  @Output() todoUpdated = new EventEmitter<ITodo>();
  @Output() todoDeleted = new EventEmitter<number>();

  loading = signal(false);

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
  ) {}

  onUpdate() {
    this.loading.set(true);
    const updatedTodo = {
      ...this.todo,
      title: randText(),
    };

    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (todoUpdated) => {
        this.loading.set(false);
        this.todoUpdated.emit(todoUpdated);
        this.showMessage('Todo updated successfully');
      },
      error: (error) => {
        this.loading.set(false);
        this.showError(error.message);
      },
    });
  }

  onDelete() {
    this.loading.set(true);
    this.todoService.deleteTodo(this.todo.id).subscribe({
      next: () => {
        this.loading.set(false);
        this.todoDeleted.emit(this.todo.id);
        this.showMessage('Todo deleted successfully');
      },
      error: (error) => {
        this.loading.set(false);
        this.showError(error.message);
      },
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
