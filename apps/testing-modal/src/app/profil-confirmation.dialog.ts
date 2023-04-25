/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>Profil</h1>
    <div mat-dialog-content>Name: {{ data.name }}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true">Confirmation</button>
    </div>
  `,
})
export class ProfilConfirmationDialog {
  data = inject(MAT_DIALOG_DATA);
}
