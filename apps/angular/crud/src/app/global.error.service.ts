import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({ providedIn: 'root' })
export class GloabalErrorHandlerService implements ErrorHandler {
  public dialogRef!: MatDialogRef<ErrorDialogComponent>;
  constructor(public dialog: MatDialog) {}
  handleError(error: HttpErrorResponse): void {
    this.openDialog(error);
  }
  openDialog(error: HttpErrorResponse) {
    this.dialogRef = this.dialog.open(ErrorDialogComponent, { data: error });
  }
}
