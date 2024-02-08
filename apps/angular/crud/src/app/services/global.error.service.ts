import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog.component';
import { TodoService } from './todo.service';

@Injectable({ providedIn: 'root' })
export class GloabalErrorHandlerService implements ErrorHandler {
  public dialogRef!: MatDialogRef<ErrorDialogComponent>;
  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
  ) {}
  handleError(error: HttpErrorResponse): void {
    this.todoService.handleError();
    this.openDialog(error);
  }

  openDialog(error: HttpErrorResponse) {
    this.dialogRef = this.dialog.open(ErrorDialogComponent, { data: error });
  }
}
