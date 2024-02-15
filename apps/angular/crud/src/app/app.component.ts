import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from './dialogs';
import { Todo } from './models';
import { TodoService } from './services';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="updateTodo(todo)">Update</button>
        <button (click)="deleteTodo(todo)">Delete</button>
      </div>
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Todo[]> = this.todoService.todos;

  constructor(
    private readonly todoService: TodoService,
    private readonly snackbar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.todoService.getAll();
  }

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
    this.dialog.closeAll();
    this.snackbar.open('Error occured', undefined, { duration: 3000 });
  }

  updateArrayItem(array: Todo[], updatedTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    const updatedArray = array.map((t) =>
      t.id === updatedTodo.id ? updatedTodo : t,
    );
    this.todos.set(updatedArray);
  }

  removeArrayItem(array: Todo[], deleteTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    const arrayWithoutItem = array.filter((t) => t.id !== deleteTodo.id);
    this.todos.set(arrayWithoutItem);
  }
}
