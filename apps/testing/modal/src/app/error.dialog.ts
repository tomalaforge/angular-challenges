/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>
      You must enter a
      <span class="font-bold">name</span>
      first!!
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class ErrorDialog {}
