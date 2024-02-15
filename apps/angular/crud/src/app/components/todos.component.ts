import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Signal,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingDialog } from '../dialogs';
import { Todo } from '../models';
import { TodoApiService } from '../services';
import { TodoListItemComponent } from './todo-list-item.component';

@Component({
  standalone: true,
  imports: [CommonModule, TodoListItemComponent],
  selector: 'app-todos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (todo of todos(); track todo.id) {
        <li>
          <app-todo-list-item
            [todo]="todo"
            (updateTodoEvent)="updateTodo($event)"
            (deleteTodoEvent)="deleteTodo($event)"
            (openDialog)="openDialog()"
            (closeDialog)="closeDialog()"></app-todo-list-item>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style-type: none;
      padding-inline-start: 0px;
    }
  `,
})
export class TodosComponent {
  private readonly todoApiService = inject(TodoApiService);
  private readonly dialog = inject(MatDialog);
  private readonly snackbar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  todos: Signal<Todo[]> = this.todoApiService.todos;

  ngOnInit(): void {
    this.todoApiService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((todos) => this.todoApiService.todos.set(todos));
  }

  updateTodo(todo: Todo): void {
    this.openDialog();
    this.todoApiService.update(todo).subscribe(
      (updatedTodo: Todo) => {
        this.closeDialog();
        this.todoApiService.todos.update((todos) =>
          Todo.updateItemInArray(todos, updatedTodo),
        );
      },
      (error) => {
        this.closeDialog();
        this.showErrorMessage();
      },
    );
  }

  deleteTodo(todo: Todo): void {
    this.openDialog();
    this.todoApiService.delete(todo).subscribe(
      () => {
        this.closeDialog();
        this.todoApiService.todos.update((todos) =>
          Todo.removeItemFromArray(todos, todo),
        );
      },
      (error) => {
        this.closeDialog();
        this.showErrorMessage();
      },
    );
  }

  openDialog(): void {
    this.dialog.open(LoadingDialog);
  }

  closeDialog(): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
  }

  showErrorMessage(): void {
    this.snackbar.open('Error occured', undefined, { duration: 3000 });
  }
}
