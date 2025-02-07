import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoService } from '../../core/todo.service';
import { Todo } from '../../todo.interface';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    TodoItemComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  protected readonly service = inject(TodoService);
  protected currentPage = 0;
  protected pageSize = 10;

  constructor(private dialog: MatDialog) {}

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }

  clearError(): void {
    this.service.clearError();
  }

  get pagedTodos(): Todo[] {
    const start = this.currentPage * this.pageSize;
    return this.service.todos().slice(start, start + this.pageSize);
  }

  changePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  addNewTask(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.createTodo(result).subscribe();
      }
    });
  }
}
