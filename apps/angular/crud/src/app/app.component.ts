import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoListItemComponent } from './components';
import { LoadingDialog } from './dialogs';
import { Todo } from './models';
import { TodoService } from './services';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, TodoListItemComponent],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content>
          <ul>
            @for (todo of todos(); track todo.id) {
              <li>
                <app-todo-list-item
                  [todo]="todo"
                  (updateItemInArray)="updateArrayItem($event)"
                  (removeItemInArray)="removeArrayItem($event)"
                  (openDialog)="openDialog()">
                  {{ todo.title }}
                </app-todo-list-item>
              </li>
            }
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    mat-card {
      width: fit-content;
      margin: 20px auto;
    }

    ul {
      list-style-type: none;
      padding-inline-start: 0px;
    }
  `,
})
export class AppComponent implements OnInit {
  todos: WritableSignal<Todo[]> = this.todoService.todos;

  constructor(
    private readonly todoService: TodoService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.todoService.getAll();
  }

  updateArrayItem(updatedTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.todos.set(Todo.updateItemInArray(this.todos(), updatedTodo));
  }

  removeArrayItem(deleteTodo: Todo): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.todos.set(Todo.removeItemFromArray(this.todos(), deleteTodo));
  }

  openDialog(): void {
    this.dialog.open(LoadingDialog);
  }

  showErrorMessage(): void {
    if (this.dialog.openDialogs) {
      this.dialog.closeAll();
    }
    this.snackbar.open('Error occured', undefined, { duration: 3000 });
  }
}
