import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TicketStore } from '../ticket.store';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    NgIf,
  ],
  template: ` <form [formGroup]="form" #ngForm="ngForm" (ngSubmit)="submit()">
    <mat-form-field class="example-full-width" appearance="fill">
      <mat-label>Description</mat-label>
      <input
        type="text"
        matInput
        formControlName="description"
        placeholder="Ex. pat@example.com" />
      <mat-error *ngIf="form.controls.description.hasError('required')">
        Description is <strong>required</strong>
      </mat-error>
    </mat-form-field>
    <button
      class="ml-4"
      mat-flat-button
      color="primary"
      type="submit"
      [disabled]="loading$ | async">
      Add new Ticket
    </button>
  </form>`,
})
export class AddComponent {
  form = new FormGroup({
    description: new FormControl(null, Validators.required),
  });

  loading$ = this.ticketStore.loading$;

  constructor(private ticketStore: TicketStore) {}

  submit() {
    if (this.form.valid) {
      this.ticketStore.addTicket(this.form.value.description ?? '');
    }
  }
}
