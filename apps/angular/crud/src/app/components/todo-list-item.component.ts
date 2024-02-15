import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from '../dialogs';
import { Todo } from '../models';
import { TodoService } from '../services';

@Component({
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  selector: 'app-todo-list-item',
  template: `
    <div>
      <mat-checkbox></mat-checkbox>
      <span>{{ todo.title }}</span>
    </div>
    <div>
      <button (click)="updateTodo(todo)">Update</button>
      <button (click)="deleteTodo(todo)">Delete</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      & > div {
        display: flex;
        align-items: center;
        height: fit-content;
        gap: 10px;
      }
    }
  `,
})
export class TodoListItemComponent {
  todos: WritableSignal<Todo[]> = this.todoService.todos;

  constructor(
    private readonly todoService: TodoService,
    private readonly snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  updateTodo(todo: Todo): void {
    this.dialog.open(LoadingDialog);
    this.todoService.update(todo).subscribe(
      (updatedTodo: Todo) => this.updateArrayItem(this.todos(), updatedTodo),
      (error) => this.showErrorMessage(),
    );
  }

  deleteTodo(todo: Todo): void {
    this.dialog.open(LoadingDialog);
    this.todoService.delete(todo).subscribe(
      () => this.removeArrayItem(this.todos(), todo),
      (error) => this.showErrorMessage(),
    );
  }

  showErrorMessage(): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.snackbar.open('Error occured', undefined, { duration: 3000 });
  }

  updateArrayItem(array: Todo[], updatedTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.todos.set(Todo.updateItemInArray(array, updatedTodo));
  }

  removeArrayItem(array: Todo[], deleteTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.todos.set(Todo.removeItemFromArray(array, deleteTodo));
  }
}
