import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { DialogAnimationsProgressComponent } from './dialogs/progress-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class ApiCallInterceptor implements HttpInterceptor {
  public dialogRef!: MatDialogRef<DialogAnimationsProgressComponent>;

  constructor(public dialog: MatDialog) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.openDialog();
    return next.handle(req).pipe(
      finalize(() => {
        this.closeDialog();
      }),
    );
  }
  openDialog() {
    this.dialogRef = this.dialog.open(DialogAnimationsProgressComponent);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
