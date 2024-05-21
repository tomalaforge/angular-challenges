import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { ErrorDialog } from './error.dialog';
import { ProfilConfirmationDialog } from './profil-confirmation.dialog';
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
  ],
  selector: 'app-root',
  host: {
    class: 'p-4 block flex gap-4 items-center',
  },
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Name</mat-label>
      <input
        type="text"
        matInput
        [formControl]="name"
        placeholder="enter your name" />
    </mat-form-field>
    <button (click)="confirm()" mat-flat-button color="primary">Confirm</button>

    <div>{{ result$ | async }}</div>
  `,
})
export class AppComponent {
  private modal = inject(MatDialog);
  private result = new BehaviorSubject<string>('');
  result$ = this.result.asObservable();

  name = new FormControl('', { nonNullable: true });

  confirm() {
    if (!this.name.value) {
      this.modal.open(ErrorDialog);
      return;
    }

    this.modal
      .open(ProfilConfirmationDialog, {
        data: {
          name: this.name.value,
        },
      })
      .afterClosed()
      .subscribe((result) =>
        this.result.next(
          result ? 'Name has been submitted' : 'Name is invalid !!',
        ),
      );
  }
}
