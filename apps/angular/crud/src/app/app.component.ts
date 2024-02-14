import { CommonModule } from '@angular/common';
import { Component, OnInit, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from './components/loading.dialog';
import { ITodo } from './models';
import { TodoService } from './services/todo.service';

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
  todos: WritableSignal<ITodo[]> = this.todoService.todos;

  constructor(
    private readonly todoService: TodoService,
    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.todoService.getAll();
  }

  updateTodo(todo: ITodo): void {
    this.dialog.open(LoadingDialog);
    this.todoService.update(todo).subscribe(
      (updatedTodo: ITodo) => {
        this.dialog.closeAll();
        this.todos.update((todos) => this.updateArrayItem(todos, updatedTodo));
      },
      (error) => {
        this.showErrorMessage();
        this.dialog.closeAll();
      },
    );
  }

  deleteTodo(todo: ITodo): void {
    this.dialog.open(LoadingDialog);
    this.todoService.delete(todo).subscribe(
      () => {
        this.dialog.closeAll();
        this.todos.update((todos) => todos.filter((t) => t.id !== todo.id));
      },
      (error) => {
        this.showErrorMessage();
        this.dialog.closeAll();
      },
    );
  }

  showErrorMessage(): void {
    this.snackbar.open('Error occured', undefined, { duration: 3000 });
  }

  private updateArrayItem(array: Todo[], updatedTodo: Todo): Todo[] {
    return array.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
  }
}
